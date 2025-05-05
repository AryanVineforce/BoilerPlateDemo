import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
// import { CreateStudentDialogComponent } from './create-student/create-student-dialog.component';
// import { EditStudentDialogComponent } from './edit-student/edit-student-dialog.component';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
import {
  GetPatientDto,
  PatientServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { CreatePatientDialogComponent } from "./create-patient/create-patient-dialog.component";
import { EditPatientDialogComponent } from "./edit-patient/edit-patient-dialog.component";

class PagedStudentsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent extends PagedListingComponentBase<GetPatientDto> {
  patients: GetPatientDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _patienservice: PatientServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createStudent(): void {
     const createDialog = this._modalService.show(
       CreatePatientDialogComponent,
      {
        class: 'modal-lg',
     }
    );
  
   (createDialog.content as CreatePatientDialogComponent).onSave.subscribe(() => {
      this.refresh();
   });
  }
  

  editStudent(student: GetPatientDto): void {
    const editDialog = this._modalService.show(
     EditPatientDialogComponent,
    {
       class: 'modal-lg',
       initialState: {
         patient: Object.assign({}, student) // Clone data to prevent 2-way binding issues
        },
     }
    );
  
     (editDialog.content as EditPatientDialogComponent).onUpdate.subscribe(() => {
       this.refresh();
     });
  }
  


  clearFilters(): void {
    this.keyword = "";
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    
    request: PagedStudentsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    debugger
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._patienservice
      .getAll(
        request.keyword,
      undefined,              
      request.skipCount,
      request.maxResultCount
      )
      .pipe(finalize(() => finishedCallback()))
      .subscribe((result: any) => {
        this.patients = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(student: GetPatientDto): void {
    abp.message.confirm(
      this.l("UserDeleteWarningMessage", student.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._patienservice.delete(student.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
  getGenderString(gender: number): string {
    switch (gender) {
      case 0: return 'Male';
      case 1: return 'Female';
      case 2: return 'Other';
      default: return 'Unknown';
    }
}
}
