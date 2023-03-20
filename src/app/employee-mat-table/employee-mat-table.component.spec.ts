import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMatTableComponent } from './employee-mat-table.component';

describe('EmployeeMatTableComponent', () => {
  let component: EmployeeMatTableComponent;
  let fixture: ComponentFixture<EmployeeMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMatTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
