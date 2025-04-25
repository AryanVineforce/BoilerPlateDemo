import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  TeacherServiceProxy,
  SubejctServiceProxy, 
  CreateSubjectDto, 
  TeacherSubjectServiceProxy,
  TeacherGetDto,
  GetSubjectDto,
  TeacherSubjectCreateUpdateDto
} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-teachersubject-dialog',
  templateUrl: './create-teachersubject-dialog.component.html',
  styleUrls: ['./create-teachersubject-dialog.component.css']
})
export class CreateTeachersubjectDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  teachers: TeacherGetDto[] = [];
  subjects: GetSubjectDto[] = [];
  teacherSubject: TeacherSubjectCreateUpdateDto = new TeacherSubjectCreateUpdateDto();

  @Output() onSave = new EventEmitter<void>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _teacherService: TeacherServiceProxy,
    private _subjectService: SubejctServiceProxy, // Typo is in the actual proxy name
    private _teacherSubjectService: TeacherSubjectServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadTeachers();
    this.loadSubjects();
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

  save(): void {
    this.saving = true;

    this._teacherSubjectService
      .create(this.teacherSubject)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
