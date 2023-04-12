import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../types/employee';

@Component({
  selector: 'app-new-employee-dialog',
  templateUrl: './new-employee-dialog.component.html',
  styleUrls: ['./new-employee-dialog.component.css']
})
export class NewEmployeeDialogComponent {
  employee: Employee = {
    id: 0,
    birthDate: '',
    firstName: '',
    lastName: '',
    gender: '',
    hireDate: ''
  };

  constructor(private ref: MatDialogRef<NewEmployeeDialogComponent>) { }
}
