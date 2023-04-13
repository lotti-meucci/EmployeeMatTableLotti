import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { Links } from '../types/links';
import { ServerData } from '../types/server-data';
import {MatDialog} from '@angular/material/dialog';
import { NewEmployeeDialogComponent } from '../new-employee-dialog/new-employee-dialog.component';
import { EMPLOYEES_ROUTE } from '../constants';

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
    'remove'
  ];

  links: Links = {
    first: {href: ''},
    last: {href: ''},
  }

  pageNumber = 0;
  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {
    this.loadPage(0);
  }

  removeRow(id: number) {
    this.employeeService.deleteData(EMPLOYEES_ROUTE, id).subscribe(() => {
      this.loadPage(this.pageNumber);
    });
  }

  draw(data: ServerData) {
    this.dataSource.data = data._embedded.employees;
    this.pageNumber = data.page.number;
    this.links = data._links;
  }

  load(url: string) {
    this.employeeService
      .getData(url)
      .subscribe(data => this.draw(data));
  }

  loadPage(page: number) {
    this.employeeService
      .getData(EMPLOYEES_ROUTE, page)
      .subscribe(data => this.draw(data));
  }

  loadFirst() {
    this.load(this.links.first.href);
  }

  loadLast() {
    this.load(this.links.last.href);
  }

  loadPrev() {
    if (this.links.prev)
      this.load(this.links.prev.href);
  }

  loadNext() {
    if (this.links.next)
      this.load(this.links.next.href);
  }

  showDialog() {
    const ref = this.dialog.open(NewEmployeeDialogComponent);

    ref.afterClosed().subscribe(data =>
    {
      if (!data)
        return;

      this.employeeService.postData(EMPLOYEES_ROUTE, data).subscribe(() => {
        this.loadPage(this.pageNumber);
        alert('Nuovo dipendende aggiunto!');
      });
    })
  }
}
