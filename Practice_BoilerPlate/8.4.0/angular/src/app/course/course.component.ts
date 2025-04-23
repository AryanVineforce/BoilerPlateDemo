import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";

import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
import {
  
 CourseServiceProxy,
  GetCourseDto
} from "@shared/service-proxies/service-proxies";
import { CreateTenantDialogComponent } from "@app/tenants/create-tenant/create-tenant-dialog.component";
import { CreateCourseDialogComponent } from "./create-course/create-course-dialog.component";
import { EditCourseDialogComponent } from "./edit-course/edit-course-dialog.component";
class PagedCoursesRequestDto extends PagedRequestDto {
  keyword: string;
}
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent extends PagedListingComponentBase<GetCourseDto> {
courses: GetCourseDto[] = [];
  isActive: boolean | null; 
  keyword = "";
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _courseservice: CourseServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  createCourse(): void {
       const createDialog = this._modalService.show(
       CreateCourseDialogComponent,
       { class: 'modal-lg' }
      );
      (createDialog.content as CreateCourseDialogComponent).onSave.subscribe(() => {
        this.refresh();
         });
    }
  
    
    
      editCourse(course: GetCourseDto): void {
        const editDialog = this._modalService.show(
        EditCourseDialogComponent,
           {
           class: 'modal-lg',
           initialState: {
            course: Object.assign({}, course) // Clone data to prevent 2-way binding issues
         },
           }
        );
      
        (editDialog.content as EditCourseDialogComponent).onUpdate.subscribe(() => {
           this.refresh();
         });
      }
      
  
  
    clearFilters(): void {
      this.keyword = "";
      this.getDataPage(1);
    }
  
    protected list(
      request: PagedCoursesRequestDto,
      pageNumber: number,
      finishedCallback: Function
    ): void {
      request.keyword = this.keyword;
  
      this._courseservice//api call
        .getAll(
          request.keyword,
          undefined,
          request.skipCount,
          request.maxResultCount
        )
        .pipe(finalize(() => finishedCallback()))
        .subscribe((result: any) => {
          this.courses = result.items;
          this.showPaging(result, pageNumber);
        });
    }
  
    protected delete(department: GetCourseDto): void {
      debugger
      abp.message.confirm(
        this.l("DeleteWarningMessage", department.name),
        undefined,
        (result: boolean) => {
          if (result) {
            this._courseservice.delete(department.id).subscribe(() => {
              abp.notify.success(this.l("SuccessfullyDeleted"));
              this.refresh();
            });
          }
        }
      );
    }
  }
  


