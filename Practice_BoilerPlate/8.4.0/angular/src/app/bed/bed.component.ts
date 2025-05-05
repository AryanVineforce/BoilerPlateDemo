import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
import {
  GetBedDto,
  BedServiceProxy
} from "@shared/service-proxies/service-proxies";
import { CreateBedDialogComponent} from './create-bed/create-bed-dialog.component';
import { EditBedDialogComponent } from "./edit-bed/edit-bed-dialog.component";
class PagedBedRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
  sorting: string;
}

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
  animations: [appModuleAnimation()]
})
export class BedComponent extends PagedListingComponentBase<GetBedDto> {
  beds: GetBedDto[] = [];
  keyword = '';
  isActive: boolean | null = null;
  advancedFiltersVisible = false;
  sorting = 'bedNumber asc'; // default sorting

  constructor(
    injector: Injector,
    private _bedService: BedServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createBed(): void {
       const createDialog = this._modalService.show(
        CreateBedDialogComponent,
          { class: 'modal-lg' }
        );
         (createDialog.content as CreateBedDialogComponent).onSave.subscribe(() => {
              this.refresh();
            });
  }

  editBed(bed: GetBedDto): void {
    const editDialog = this._modalService.show(
           EditBedDialogComponent,
           {
             class: 'modal-lg',
             initialState: {
               bed: Object.assign({}, bed) // Clone data to prevent 2-way binding issues
             },
           }
         );
       
         (editDialog.content as EditBedDialogComponent).onUpdate.subscribe(() => {
           this.refresh();
         });
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = null;
    this.getDataPage(1);
  }

  changeSorting(column: string): void {
    const [currentColumn, currentDirection] = this.sorting.split(' ');
    if (currentColumn === column) {
      this.sorting = `${column} ${currentDirection === 'asc' ? 'desc' : 'asc'}`;
    } else {
      this.sorting = `${column} asc`;
    }
    this.getDataPage(1);
  }

  refresh(): void {
    this.getDataPage(this.pageNumber);
  }

  protected list(
    request: PagedBedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    // request.sorting = this.sorting;

    this._bedService
      .getAll(
        request.keyword,
        request.sorting, 
        request.skipCount,
        request.maxResultCount
      )
      .pipe(finalize(() => finishedCallback()))
      .subscribe(result => {
        this.beds = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(bed: GetBedDto): void {
    abp.message.confirm(
      this.l('DeleteWarningMessage', bed.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._bedService.delete(bed.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  getTypeString(gender: number): string {
    switch (gender) {
      case 0: return 'General';
      case 1: return 'ICU';
      case 2: return 'SemiICU';
      case 3: return 'Isolation';
      default: return 'Unknown';
    }
}
gettypeString(gender: number): string {
  switch (gender) {
    case 0: return 'Available';
    case 1: return 'Occupied';
    case 2: return 'Blocked';
    
    default: return 'Unknown';
  }
}
}
