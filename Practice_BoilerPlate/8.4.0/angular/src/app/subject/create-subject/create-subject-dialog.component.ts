
import { Component, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { SubejctServiceProxy, CreateSubjectDto} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import {  EventEmitter, Output } from "@angular/core";
import { CourseServiceProxy, GetCourseDto } from '@shared/service-proxies/service-proxies';



@Component({
  selector: 'app-create-subject-dialog',
  templateUrl: './create-subject-dialog.component.html',
  styleUrls: ['./create-subject-dialog.component.css']
})
export class CreateSubjectDialogComponent extends AppComponentBase {
saving = false;
  subject = new CreateSubjectDto ();
    courses: GetCourseDto[] = [];
  @Output() onSave = new EventEmitter<any>(); // Make sure DepartmentDto has name, code, description
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _subjectserive: SubejctServiceProxy,
    private _courseservice: CourseServiceProxy
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.loadCourses();
  }
  
  loadCourses(): void {
    this._courseservice.getAll('', undefined, 0, 1000).subscribe((result) => {
      this.courses = result.items;
    });
  }

  save(): void {
    this.saving = true;

    this._subjectserive
      .create(this.subject)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit(); 
      });
  }
}


