import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

import {
  StudentServiceProxy,
  CreateStudentDto,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import * as moment from "moment";

@Component({
  selector: "app-create-student-dialog",
  templateUrl: "./create-student-dialog.component.html",
})
export class CreateStudentDialogComponent extends AppComponentBase {
  saving = false;
  student = new CreateStudentDto();

  @Output() onSave = new EventEmitter<any>();
  selectedDate: Date;
  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  //
  save(): void {
    console.log("Student DTO:", this.student);

    this.saving = true;
    this.student.dob = moment(this.selectedDate);

    this._studentService.create(this.student).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
