import { Component, Injector, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  TeacherServiceProxy,
  SubejctServiceProxy,
  TeacherSubjectServiceProxy,
  TeacherGetDto,
  GetSubjectDto,
  TeacherSubjectCreateUpdateDto
} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-teachersubject-dialog',
  templateUrl: './edit-teachersubject-dialog.component.html',
  styleUrls: ['./edit-teachersubject-dialog.component.css']
})
export class EditTeacherSubjectDialogComponent extends AppComponentBase implements OnInit {
  saving = false;

  @Input() subject: any; // Receive from initialState
  @Output() onUpdate = new EventEmitter<any>();

  teacherSubject: TeacherSubjectCreateUpdateDto = new TeacherSubjectCreateUpdateDto();
  teachers: TeacherGetDto[] = [];
  subjects: GetSubjectDto[] = [];

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _teacherService: TeacherServiceProxy,
    private _subjectService: SubejctServiceProxy,
    private _teacherSubjectService: TeacherSubjectServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadSubjects();

    if (this.subject) {
      this.teacherSubject = Object.assign({}, this.subject);
    }
  }

  loadTeachers(): void {
    this._teacherService.getAll('', undefined, 0, 1000).subscribe(result => {
      this.teachers = result.items;
    });
  }

  loadSubjects(): void {
    this._subjectService.getAll('', undefined, 0, 1000).subscribe(result => {
      this.subjects = result.items;
    });
  }

  update(): void {
    this.saving = true;

    this._teacherSubjectService
      .update(this.teacherSubject)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('UpdatedSuccessfully'));
        this.bsModalRef.hide();
        this.onUpdate.emit();
      });
  }
}
