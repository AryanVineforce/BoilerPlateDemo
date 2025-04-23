import { Component,Injector } from '@angular/core';
import { finalize } from "rxjs/operators";
import { EmployeeServiceProxy, GetEmployeeDto } from '@shared/service-proxies/service-proxies';
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";



import {
  PagedListingComponentBase,
  PagedRequestDto,

} from "shared/paged-listing-component-base";
import { CreateEmployeeDialogComponent } from './create-employee/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from './edit-employee/edit-employee-dialog.component';

class PagedEmployeeRequestDto extends PagedRequestDto {
  keyword: string;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
   animations: [appModuleAnimation()]
})

export class EmployeeComponent extends PagedListingComponentBase<GetEmployeeDto> {
  employees: GetEmployeeDto[] = [];//api se ayi hoi list store krta hai
  isActive: boolean | null; 
  keyword = "";
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,// base class ke liye. page wali
    private _employeeSerivce: EmployeeServiceProxy,//employee APIs call karne ke liye.
    private _modalService: BsModalService//popoup open krne ke lie create edit delete
  ) {
    super(injector);
  }

  createDepartment(): void {
    const createDialog = this._modalService.show(
      CreateEmployeeDialogComponent,
      { class: 'modal-lg' }
    );
     (createDialog.content as CreateEmployeeDialogComponent).onSave.subscribe(() => {//jb employee create hota hai onsave trigger hota
          this.refresh();//list dubara load hoti
        });
  }
  

  // editDepartment(department: GetDepartmentDto): void {
  //   const editDialog = this._modalService.show(
  //     EditDepartmentDialogComponent,
  //     {
  //       class: 'modal-lg',
  //       initialState: {
  //         department: Object.assign({}, department)
  //       }
  //     }
  //   );

  //   (editDialog.content as EditDepartmentDialogComponent).onUpdate.subscribe(() => {
  //     this.refresh();
  //   });
  // }
  
    // editDepartment(employee: GetEmployeeDto): void {
    //   const editDialog = this._modalService.show(
    //     EditEmployeeDialogComponent,
    //     {
    //       class: 'modal-lg',
    //       initialState: {
    //         employeeToEdit: Object.assign({}, employee) // Clone data to prevent 2-way binding issues
    //       },
    //     }
    //   );
    
    //   (editDialog.content as EditEmployeeDialogComponent).onUpdate.subscribe(() => {
    //     this.refresh();
    //   });
    // }
    editEmployee(employee: any): void {
        const editDialog = this._modalService.show(
          EditEmployeeDialogComponent,
          {
            class: 'modal-lg',
            initialState: {
              employee: Object.assign({}, employee) // Clone data to prevent 2-way binding issues
            },
          }
        );
      
        (editDialog.content as EditEmployeeDialogComponent).onUpdate.subscribe(() => {
          this.refresh();
        });
      }




  protected list(
    request:PagedEmployeeRequestDto ,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    debugger
    request.keyword = this.keyword;

    this._employeeSerivce//api call employeee ke data ke lie  
      .getAll(
        request.keyword,
        undefined,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(finalize(() => finishedCallback()))
      .subscribe((result: any) => {
        console.log("Employee API Result", result);
        this.employees = result.items;//result.items ko employees array me store karta hai.


        this.showPaging(result, pageNumber);
      });
  }

  protected delete(employee: GetEmployeeDto): void {
    debugger
    abp.message.confirm(
      this.l("DeleteWarningMessage", employee.firstName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._employeeSerivce.delete(employee.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  }




