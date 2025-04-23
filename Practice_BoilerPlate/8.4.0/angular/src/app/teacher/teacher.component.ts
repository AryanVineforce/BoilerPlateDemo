import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
import {
  GetStudentDto,
  TeacherGetDto,
  TeacherServiceProxy
} from "@shared/service-proxies/service-proxies";
import { CreateTeacherDialogComponent } from "./create-teacher/create-teacher-dialog.component";
import { EditTeacherDialogComponent } from "./edit-teacher/edit-teacher-dialog.component";
class PagedTeachersRequestDto  extends PagedRequestDto {
  keyword: string;
}
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  animations: [appModuleAnimation()]
})
export class TeacherComponent  extends PagedListingComponentBase<TeacherGetDto>{
  teachers : TeacherGetDto []=[];
  isActive: boolean | null; 
  keyword = "";
  advancedFiltersVisible = false;

  constructor(
      injector: Injector,
      private _teacherservice: TeacherServiceProxy,
      private _modalService: BsModalService
    ) {
      super(injector);
    }
  
    createTeacher(): void {
      const createDialog = this._modalService.show(
         CreateTeacherDialogComponent,
        { class: 'modal-lg' }
      );
       (createDialog.content as CreateTeacherDialogComponent).onSave.subscribe(() => {
             this.refresh();
          });
    }
  
    
    
      editTeacher(teacher: TeacherGetDto): void {
         const editDialog = this._modalService.show(
           EditTeacherDialogComponent,
          {
           class: 'modal-lg',
            initialState: {
              teacher: Object.assign({}, teacher) // Clone data to prevent 2-way binding issues
            },
          }
        );
      
        (editDialog.content as EditTeacherDialogComponent).onUpdate.subscribe(() => {
        this.refresh();
       });
      }
      
  
  
    clearFilters(): void {
      this.keyword = "";
      this.getDataPage(1);
    }
  
    protected list(
      request: PagedTeachersRequestDto,
      pageNumber: number,
      finishedCallback: Function
    ): void {
      request.keyword = this.keyword;
  
      this._teacherservice//api call
        .getAll(
          request.keyword,
          undefined,
          request.skipCount,
          request.maxResultCount
        )
        .pipe(finalize(() => finishedCallback()))
        .subscribe((result: any) => {
          this.teachers = result.items;
          this.showPaging(result, pageNumber);
        });
    }
  
    protected delete(teacher: TeacherGetDto): void {
      debugger
      abp.message.confirm(
        this.l("DeleteWarningMessage", teacher.name),
        undefined,
        (result: boolean) => {
          if (result) {
            this._teacherservice.delete(teacher.id).subscribe(() => {
              abp.notify.success(this.l("SuccessfullyDeleted"));
              this.refresh();
            });
          }
        }
      );
    }
  }
  


