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
  UpdateDepartmentDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Input } from "@angular/core";


@Component({
  selector: "app-edit-department-dialog",
  templateUrl: "./edit-department-dialog.component.html"
})
export class EditDepartmentDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  @Input() department: UpdateDepartmentDto; //

  @Output() onUpdate = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _departmentService: DepartmentServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // You can add logic here if needed on init
  }

  update(): void {
    if (!this.department.name || !/^[a-zA-Z\s]+$/.test(this.department.name)) {
      alert("Name should contain only alphabets.");
      return;
    }

    if (!this.department.code || !/^[a-zA-Z0-9]+$/.test(this.department.code)) {
      alert("Code should be alphanumeric with no special characters.");
      return;
    }

    if (!this.department.description) {
      alert("Description is required.");
      return;
    }

    this.saving = true;

    this._departmentService.update(this.department).subscribe(
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
