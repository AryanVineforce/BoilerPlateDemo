import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  CourseServiceProxy,
  UpdateCourseDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Input } from "@angular/core";


@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent extends AppComponentBase
implements OnInit {
  saving = false;
    @Input() course: UpdateCourseDto; //
  
    @Output() onUpdate = new EventEmitter<any>();
  
    constructor(
      injector: Injector,
      private _courseservice: CourseServiceProxy,
      public bsModalRef: BsModalRef
    ) {
      super(injector);
    }
    ngOnInit(): void {
      // You can add logic here if needed on init
    }
    update(): void {
      // if (!this.department.name || !/^[a-zA-Z\s]+$/.test(this.department.name)) {
      //   alert("Name should contain only alphabets.");
      //   return;
      // }
  
      // if (!this.department.code || !/^[a-zA-Z0-9]+$/.test(this.department.code)) {
      //   alert("Code should be alphanumeric with no special characters.");
      //   return;
      // }
  
      // if (!this.department.description) {
      //   alert("Description is required.");
      //   return;
      // }
  
      this.saving = true;
  
      this._courseservice.update(this.course).subscribe(
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
  


