// src/app/department/create-department/create-department-dialog.component.ts

import { Component, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentServiceProxy, DepartmentCreateUpdateDto} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import {  EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-create-department-dialog',
  templateUrl: './create-department-dialog.component.html',
})
export class CreateDepartmentDialogComponent extends AppComponentBase {
  saving = false;
  department = new DepartmentCreateUpdateDto ();
  @Output() onSave = new EventEmitter<any>(); // Make sure DepartmentDto has name, code, description
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _departmentService: DepartmentServiceProxy
  ) {
    super(injector);
  }

  save(): void {
    this.saving = true;

    this._departmentService
      .create(this.department)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit(); 
      });
  }
}
