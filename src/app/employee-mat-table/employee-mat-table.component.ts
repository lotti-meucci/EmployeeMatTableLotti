import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Employee {
  id: number;
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: string;
  hireDate: string;
}

const EMPLOYEE_DATA: Employee[] = [
  {
    "id": 10001,
    "birthDate": "1953-09-02",
    "firstName": "Georgi",
    "lastName": "Facello",
    "gender": "M",
    "hireDate": "1986-06-26",
  },
  {
    "id": 10002,
    "birthDate": "1964-06-02",
    "firstName": "Bezalel",
    "lastName": "Simmel",
    "gender": "F",
    "hireDate": "1985-11-21",
  },
  {
    "id": 10003,
    "birthDate": "1959-12-03",
    "firstName": "Parto",
    "lastName": "Bamford",
    "gender": "M",
    "hireDate": "1986-08-28",
  },
  {
    "id": 10004,
    "birthDate": "1954-05-01",
    "firstName": "Chirstian",
    "lastName": "Koblick",
    "gender": "M",
    "hireDate": "1986-12-01",
  },
  {
    "id": 10005,
    "birthDate": "1955-01-21",
    "firstName": "Kyoichi",
    "lastName": "Maliniak",
    "gender": "M",
    "hireDate": "1989-09-12",
  },
  {
    "id": 10006,
    "birthDate": "1953-04-20",
    "firstName": "Anneke",
    "lastName": "Preusig",
    "gender": "F",
    "hireDate": "1989-06-02",
  },
  {
    "id": 10007,
    "birthDate": "1957-05-23",
    "firstName": "Tzvetan",
    "lastName": "Zielinski",
    "gender": "F",
    "hireDate": "1989-02-10",
  },
  {
    "id": 10008,
    "birthDate": "1958-02-19",
    "firstName": "Saniya",
    "lastName": "Kalloufi",
    "gender": "M",
    "hireDate": "1994-09-15",
  },
  {
    "id": 10009,
    "birthDate": "1952-04-19",
    "firstName": "Sumant",
    "lastName": "Peac",
    "gender": "F",
    "hireDate": "1985-02-18",
  },
  {
    "id": 10010,
    "birthDate": "1963-06-01",
    "firstName": "Duangkaew",
    "lastName": "Piveteau",
    "gender": "F",
    "hireDate": "1989-08-24",
  },
];

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

  dataSource = new MatTableDataSource<Employee>(EMPLOYEE_DATA);

  removeRow(index: number) {
    EMPLOYEE_DATA.splice(index, 1)
    this.dataSource.data = EMPLOYEE_DATA;
  }
}
