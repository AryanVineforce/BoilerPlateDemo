import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";

import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
import {
  GetAddressDto,
  AddressServiceProxy
} from "@shared/service-proxies/service-proxies";
import { CreateAddressDialogComponent } from "./create-address/create-address-dialog.component";
import { EditAddressDialogComponent } from "./edit-address/edit-address-dialog.component";
class PagedAddressRequestDto  extends PagedRequestDto {
  keyword: string;
}
// import { EditDepartmentDialogComponent } from "./edit-department/edit-department-dialog.component";
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends PagedListingComponentBase<GetAddressDto>  {
  address: GetAddressDto[] = [];
  isActive: boolean | null; 
  keyword = "";
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _addressservice: AddressServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  createDepartment(): void {
      const createDialog = this._modalService.show(
      CreateAddressDialogComponent,
        { class: 'modal-lg' }
     );
       (createDialog.content as CreateAddressDialogComponent).onSave.subscribe(() => {
            this.refresh();
          });
    }
  
    
    
      editDepartment(address: GetAddressDto): void {
        const editDialog = this._modalService.show(
          EditAddressDialogComponent,
          {
            class: 'modal-lg',
            initialState: {
              address: Object.assign({}, address) // Clone data to prevent 2-way binding issues
             },
           }
         );
      
         (editDialog.content as EditAddressDialogComponent).onUpdate.subscribe(() => {
           this.refresh();
         });
      }
      
  
  
    clearFilters(): void {
      this.keyword = "";
      this.getDataPage(1);
    }
  
    protected list(
      request: PagedAddressRequestDto,
      pageNumber: number,
      finishedCallback: Function
    ): void {
      request.keyword = this.keyword;
  
      this._addressservice//api call
        .getAll(
          request.keyword,
          undefined,
          request.skipCount,
          request.maxResultCount
        )
        .pipe(finalize(() => finishedCallback()))
        .subscribe((result: any) => {
          this.address = result.items;
          this.showPaging(result, pageNumber);
        });
    }
  
    protected delete(address: GetAddressDto): void {
      debugger
      abp.message.confirm(
        this.l("DeleteWarningMessage", address.address1),
        undefined,
        (result: boolean) => {
          if (result) {
            this._addressservice.delete(address.id).subscribe(() => {
              abp.notify.success(this.l("SuccessfullyDeleted"));
              this.refresh();
            });
          }
        }
      );
    }
  }
  


