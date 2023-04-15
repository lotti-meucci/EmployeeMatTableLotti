import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../types/employees';
import { DefaultErrorStateMatcher } from '../utils/default-error-state-matcher';
import { isEqual } from "lodash";

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

  form = new FormGroup({
    lastNameControl: new FormControl(),
    firstNameControl: new FormControl(),
    genderControl: new FormControl(),
    birthDateControl: new FormControl(),
    hireDateControl: new FormControl()
  });

  matcher = new DefaultErrorStateMatcher();

  constructor (@Inject(MAT_DIALOG_DATA) protected data: Employee) {
    if (data)
      this.employee = structuredClone(data);
  }

  get isUnchanged(): boolean {
    return isEqual(this.employee, this.data);
  }
}
