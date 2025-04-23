import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Input } from '@angular/core';

import {
  DepartmentServiceProxy,
  EmployeeServiceProxy,
  UpdateEmployeeDto,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import * as moment from "moment";
@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
// export class EditEmployeeDialogComponent  {

// }
export class EditEmployeeDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  @Input() employee: UpdateEmployeeDto = new UpdateEmployeeDto();

 departments: any[] = [];

  @Output() onUpdate = new EventEmitter<any>();
  selectedDate: string;
  selectedDatee:string;
  selectDe:string;
  constructor(
    injector: Injector,
    private _employeeSerivice: EmployeeServiceProxy,
    private _departmentService: DepartmentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
   debugger
   
      // this.selectedDate = (this.student.dob ).toDate(); 
 if (this.employee.dateOfBirth) {
      
        this.selectedDatee = moment(this.employee.dateOfBirth).format('YYYY-MM-DD');
      }
      if (this.employee.hireDate) {
      
        this.selectedDate = moment(this.employee.dateOfBirth).format('YYYY-MM-DD');
      }
      this.selectDe = this.employee.departmentName; 
      this._departmentService.getAll(undefined,undefined,undefined,undefined).subscribe(result => {
        this.departments = result.items; // or result if it returns an array directly
      });
    // Moment → Date
      }
  update(): void {
    this.employee.dateOfBirth = moment(this.selectedDatee); // from string to moment
    this.employee.hireDate = moment(this.selectedDate); // from string to moment

    this.saving = true;
   
    console.log("clicked");

    console.log("Updated Student DTO:", this.employee);

    this._employeeSerivice.update(this.employee).subscribe(
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

