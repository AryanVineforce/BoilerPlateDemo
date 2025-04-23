import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  DepartmentServiceProxy,
  TeacherServiceProxy,
  TeacherUpdateDto,
  UpdateDepartmentDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Input } from "@angular/core";


@Component({
  selector: 'app-edit-teacher-dialog',
  templateUrl: './edit-teacher-dialog.component.html',
  styleUrls: ['./edit-teacher-dialog.component.css']
})
export class EditTeacherDialogComponent  extends AppComponentBase
implements OnInit{
  saving = false;
  @Input() teacher: TeacherUpdateDto; //

  @Output() onUpdate = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _teacherservice: TeacherServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    // You can add logic here if needed on init
  }
  update(): void {
   

    this.saving = true;

    this._teacherservice.update(this.teacher).subscribe(
      () => {
        this.notify.info(this.l("UpdatedSuccessfully"));
        this.bsModalRef.hide();
        this.onUpdate.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}


