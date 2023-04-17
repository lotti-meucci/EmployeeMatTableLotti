import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { Links } from '../types/links';
import { ServerData } from '../types/server-data';
import {MatDialog} from '@angular/material/dialog';
import { NewEmployeeDialogComponent } from '../new-employee-dialog/new-employee-dialog.component';
import { EMPLOYEES_ROUTE } from '../constants';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Employee {
  id: number;
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: string;
  hireDate: string;
}

@Component({
  selector: 'app-employee-mat-table',
  templateUrl: './employee-mat-table.component.html',
  styleUrls: ['./employee-mat-table.component.css']
})
export class EmployeeMatTableComponent {
  displayedColumns: string[] = [
    'id',
    'lastName',
    'firstName',
    'gender',
    'birthDate',
    'hireDate',
    'actions'
  ];

  links: Links = {
    first: {href: ''},
    last: {href: ''},
  }

  pageNumber = 0;
  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadPage(0);
  }

  removeRow(id: number) {
    this.employeeService.deleteData(EMPLOYEES_ROUTE, id).subscribe(() => {
      this.reload()
    });
  }

  draw(data: ServerData) {
    this.dataSource.data = data._embedded.employees;
    this.pageNumber = data.page.number;
    this.links = data._links;
  }

  load(url: string, loadingLast = false) {
    this.employeeService
      .getData(url)
      .subscribe(data => {
        this.draw(data)

        if (loadingLast && this.links.next)
          this.loadLast();
      });
  }

  loadPage(page: number) {
    this.employeeService
      .getData(EMPLOYEES_ROUTE, page)
      .subscribe(data => {
        this.draw(data);

        if (data._embedded.employees.length == 0 && this.links.prev)
          this.loadPrev();
      });
  }

  loadFirst() {
    this.load(this.links.first.href);
  }

  loadLast() {
    this.load(this.links.last.href, true);
  }

  loadPrev() {
    if (this.links.prev)
      this.load(this.links.prev.href);
  }

  loadNext() {
    if (this.links.next)
      this.load(this.links.next.href);
  }

  reload() {
    this.loadPage(this.pageNumber);
  }

  showNewDialog() {
    const ref = this.dialog.open(NewEmployeeDialogComponent);

    ref.afterClosed().subscribe(data =>
    {
      if (!data)
        return;

      this.employeeService.postData(EMPLOYEES_ROUTE, data).subscribe(() => {
        this.loadLast();
        this.snackBar.open('New employee added!', 'Close');
      });
    })
  }

  showEditDialog(employee: Employee) {
    const id = employee.id;
    const ref = this.dialog.open(NewEmployeeDialogComponent, { data: employee });

    ref.afterClosed().subscribe(data =>
    {
      if (!data)
        return;

      this.employeeService.putData(EMPLOYEES_ROUTE, data).subscribe(() => {
        this.reload();
        this.snackBar.open(`Employee ${id} edited!`, 'Close');
      });
    })
  }
}
