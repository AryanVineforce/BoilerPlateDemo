import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  EnrollmentGetDto,
  GetStudentDto,
  EnrollmentServiceProxy
} from '@shared/service-proxies/service-proxies';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from "shared/paged-listing-component-base";
import { CreateEnrollmentDialogComponent } from "./create-enrollment/create-enrollment-dialog.component";
import { EditEnrollmentDialogComponent } from "./edit-enrollment/edit-enrollment-dialog.component";

class PagedEnrollmentsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css'],
  animations: [appModuleAnimation()]
})
export class EnrollmentComponent extends PagedListingComponentBase<EnrollmentGetDto> {
  students: EnrollmentGetDto[] = [];
  isActive: boolean | null;
  keyword = "";
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _enrollService: EnrollmentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createEnrollment(): void {
   
    const createDialog = this._modalService.show(
      CreateEnrollmentDialogComponent,
    { class: 'modal-lg' }
    );
     (createDialog.content as CreateEnrollmentDialogComponent).onSave.subscribe(() => {
     this.refresh();
     });
  }

  editEnrollment(enrollment: EnrollmentGetDto): void {
    // Uncomment and plug in actual modal
    const editDialog = this._modalService.show(
       EditEnrollmentDialogComponent,
      {
        class: 'modal-lg',
         initialState: {
        enrollments: Object.assign({},enrollment)
        },
       }
    );
     (editDialog.content as EditEnrollmentDialogComponent).onUpdate.subscribe(() => {
      this.refresh();
   });
  }

  clearFilters(): void {
    this.keyword = "";
    this.getDataPage(1);
  }

  protected list(
    request: PagedEnrollmentsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._enrollService
      .getAll(
        request.keyword,
       undefined,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(finalize(() => finishedCallback()))
      .subscribe((result: any) => {
        this.students = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(student: EnrollmentGetDto): void {
    abp.message.confirm(
      this.l("DeleteWarningMessage", student.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._enrollService.delete(student.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
}
