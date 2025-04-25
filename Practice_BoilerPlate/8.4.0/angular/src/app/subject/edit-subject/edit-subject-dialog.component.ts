import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  SubejctServiceProxy,
  UpdateSubjectDto,
  CourseServiceProxy,
  GetCourseDto
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrls: ['./edit-subject-dialog.component.css'],
})
export class EditSubjectDialogComponent extends AppComponentBase implements OnInit {
  saving = false;

  @Input() subject: UpdateSubjectDto = new UpdateSubjectDto();
  courses: GetCourseDto[] = [];

  @Output() onUpdate = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _subjectService: SubejctServiceProxy,
    private _courseService: CourseServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this._courseService.getAll('', undefined, 0, 1000).subscribe((result) => {
      this.courses = result.items;
    });
  }

  update(): void {
    this.saving = true;

    this._subjectService.update(this.subject).subscribe(
      () => {
        this.notify.info(this.l('UpdatedSuccessfully'));
        this.bsModalRef.hide();
        this.onUpdate.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
