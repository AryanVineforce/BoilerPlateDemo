import { Component,Injector } from '@angular/core';
import { CreateUpdateEmployeDto,DepartmentCreateUpdateDto, GetDepartmentDto } from '@shared/service-proxies/service-proxies';
import { EmployeeServiceProxy,DepartmentServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import {  EventEmitter, Output } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppComponentBase } from '@shared/app-component-base';
import * as moment from '@node_modules/moment-timezone';

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.css']
})
export class CreateEmployeeDialogComponent extends AppComponentBase{
saving = false;
  employee = new CreateUpdateEmployeDto ();
  departments: GetDepartmentDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  selectedDate: Date; // Make sure DepartmentDto has name, code, description
  selectedDatee: Date; // Make sure DepartmentDto has name, code, description
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _employeeService:EmployeeServiceProxy,
    private _departmentService:DepartmentServiceProxy
  ) {
    super(injector);
  }
    ngOnInit() {
    this.loadDepartments();
    this.employee.dateOfBirth=moment(this.selectedDatee);
    this.employee.hireDate=moment(this.selectedDate); // Call loadDepartments to fetch the list of departments
  }

  loadDepartments(): void {
    this._departmentService.getAll(undefined,undefined,undefined,undefined)  // Fetch all departments from your API
      .subscribe((result) => {
        this.departments = result.items;  // Assuming 'items' is the list of departments
      });
  }

  save(): void {
    this.saving = true;
     this.employee.dateOfBirth=moment(this.selectedDatee);
     this.employee.hireDate=moment(this.selectedDate);
    this._employeeService
      .create(this.employee)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit(); 
      });
  }
}


