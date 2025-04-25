import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { GetSubjectDto } from '@shared/service-proxies/service-proxies';


import {
  PagedListingComponentBase,
  PagedRequestDto,
  
} from "shared/paged-listing-component-base";

import {

  SubejctServiceProxy
} from "@shared/service-proxies/service-proxies";
import { CreateSubjectDialogComponent } from "./create-subject/create-subject-dialog.component";

import { EditSubjectDialogComponent } from "./edit-subject/edit-subject-dialog.component";
class PagedDepartmentsRequestDto extends PagedRequestDto {
  keyword: string;
}


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  animations: [appModuleAnimation()]
})
export class SubjectComponent extends PagedListingComponentBase<GetSubjectDto> {
 subjects: GetSubjectDto[] = [];
  isActive: boolean | null; 
  keyword = "";
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _subjectservice: SubejctServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
    createDepartment(): void {
       const createDialog = this._modalService.show(
        CreateSubjectDialogComponent,
       { class: 'modal-lg' }
    );
     (createDialog.content as CreateSubjectDialogComponent).onSave.subscribe(() => {
            this.refresh();
          });
    }
  
    
    
      editDepartment(subject: GetSubjectDto): void {
         const editDialog = this._modalService.show(
          EditSubjectDialogComponent,
         {
            class: 'modal-lg',
            initialState: {
            subject: Object.assign({}, subject) // Clone data to prevent 2-way binding issues
           },
          }
       );
      
         (editDialog.content as EditSubjectDialogComponent).onUpdate.subscribe(() => {
          this.refresh();
        });
      }
      
  
  
    clearFilters(): void {
      this.keyword = "";
      this.getDataPage(1);
    }
  
    protected list(
      request: PagedDepartmentsRequestDto,
      pageNumber: number,
      finishedCallback: Function
    ): void {
      request.keyword = this.keyword;
  
      this._subjectservice//api call
        .getAll(
          request.keyword,
          undefined,
          request.skipCount,
          request.maxResultCount
        )
        .pipe(finalize(() => finishedCallback()))
        .subscribe((result: any) => {
          this.subjects = result.items;
          this.showPaging(result, pageNumber);
        });
    }
  
    protected delete(subject: GetSubjectDto): void {
      debugger
      abp.message.confirm(
        this.l("DeleteWarningMessage", subject.name),
        undefined,
        (result: boolean) => {
          if (result) {
            this._subjectservice.delete(subject.id).subscribe(() => {
              abp.notify.success(this.l("SuccessfullyDeleted"));
              this.refresh();
            });
          }
        }
      );
    }
  }
  

