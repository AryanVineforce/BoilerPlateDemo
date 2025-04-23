// src/app/department/create-department/create-department-dialog.component.ts

import { Component, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { TeacherServiceProxy, TeacherCreateDto, TeacherGetDto} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import {  EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-create-teacher-dialog',
  templateUrl: './create-teacher-dialog.component.html',
  styleUrls: ['./create-teacher-dialog.component.css']
})
export class CreateTeacherDialogComponent extends AppComponentBase {
  saving = false;
  teacher = new TeacherCreateDto ();
  @Output() onSave = new EventEmitter<any>(); // Make sure DepartmentDto has name, code, description
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _teacherservice: TeacherServiceProxy
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // this.teacher = new TeacherGetDto(); // or appropriate class/interface

    // this._teacherservice.TeacherCreateDto().subscribe(result => {
    //   this.teacher.employeeID = result; // Auto-generated ID
    // });

  }
  save(): void {
    this.saving = true;

    this._teacherservice
      .create(this.teacher)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit(); 
      });
  }
}
