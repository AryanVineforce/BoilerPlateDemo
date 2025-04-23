import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  StudentServiceProxy,
  UpdateStudentDto,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import * as moment from "moment";

@Component({
  selector: "app-edit-student-dialog",
  templateUrl: "./edit-student-dialog.component.html",
})
export class EditStudentDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  student = new UpdateStudentDto();

  @Output() onUpdate = new EventEmitter<any>();
  selectedDate: string;
  sphone:string;
  selectedGender: import("c:/Users/Aryan Jain/source/repos/Practice_BoilerPlate/8.4.0/angular/src/shared/service-proxies/service-proxies").Gender;
  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
   debugger
   
      // this.selectedDate = (this.student.dob ).toDate(); 
      if (this.student.dob) {
        // Convert moment → JS Date
        this.selectedDate = moment(this.student.dob).format('YYYY-MM-DD');
      }
      this.selectedGender = this.student.gender; // Moment → Date
      this.sphone=this.student.phoneNumber;
      }

  update(): void {
    if (this.student.age < 18 || this.student .age > 100) {
      alert("Age must be greater than 18 and less than 100.");
      return ;
    }
    if (!/^[a-zA-Z0-9]+$/.test(this.student .rollNumber)) {
      alert("Roll number should only contain alphabets and numbers, no special characters or symbols allowed.");
      return ;
    }
    if (!/^[a-zA-Z]+$/.test(this.student .name)) {
      alert("Name should only contain alphabets  , no numbers special characters or symbols allowed.");
      return ;
    }
    this.student.gender = this.selectedGender;
    this.student.dob = moment(this.selectedDate); // from string to moment

    this.saving = true;
   
    console.log("clicked");

    console.log("Updated Student DTO:", this.student);

    this._studentService.update(this.student).subscribe(
      () => {
        this.notify.info(this.l("UpdatedSuccessfully"));
        this.bsModalRef.hide();
        this.onUpdate.emit(); // Refresh parent list
      },
      () => {
        this.saving = false;
      }
    );
  }
}
