import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Employee } from '../types/employee';

export class DefaultErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
}
