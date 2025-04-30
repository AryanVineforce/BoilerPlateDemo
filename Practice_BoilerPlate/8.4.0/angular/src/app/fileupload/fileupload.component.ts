import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
 
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
 
import {
  FileUploadDto,
  FileServiceProxy,
  FileUpdateDto,
  FileGetDto
} from "@shared/service-proxies/service-proxies";
import { CreateFileuploadDialogComponent } from "./create-fileupload/create-fileupload-dialog.component";
import { EditFileuploadDialogComponent } from "./edit-fileupload/edit-fileupload-dialog.component";
// import { CreateFileuploadDialogComponent } from "./create-fileupload/create-fileupload-dialog.component";
 
// import { UploadFileDialogComponent } from "./upload-file/upload-file-dialog.component"; // naya modal component
 
class PagedFileUploadRequestDto extends PagedRequestDto {
  keyword: string;
}
 
@Component({
  selector: "app-fileupload",
  templateUrl: "./fileupload.component.html",
  styleUrls: ["./fileupload.component.css"],
  animations: [appModuleAnimation()],
})
export class FileuploadComponent extends PagedListingComponentBase<FileUploadDto> {
  files: FileUploadDto[] = [];
  keyword = "";
  advancedFiltersVisible = false;
  isActive: boolean | null; // future ke liye agar isActive filter chahiye ho
  totalFiles: number = 0;
 
  constructor(
    injector: Injector,
    private _fileUploadService: FileServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
 
  uploadFile(): void {
     const uploadDialog = this._modalService.show(
       CreateFileuploadDialogComponent,
       { class: 'modal-lg' }
      );
     (uploadDialog.content as CreateFileuploadDialogComponent).onSave.subscribe(() => {
        this.refresh();
     });
  }
 
  editDepartment(file: FileGetDto): void {
    const editDialog = this._modalService.show(EditFileuploadDialogComponent, {
      class: 'modal-lg',
      initialState: {
        fileToEdit: file // Pass the file object
      }
    });
  
    (editDialog.content as EditFileuploadDialogComponent).onUpdate.subscribe(() => {
      this.refresh();
    });
  }
  
  clearFilters(): void {
    this.keyword = "";
    this.getDataPage(1);
  }
  protected list(
    request: PagedFileUploadRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
 
    this._fileUploadService
      .getAll(
        request.keyword,
        undefined,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(finalize(() => finishedCallback()))
      .subscribe((result: any) => {
        this.files = result.items;
        this.showPaging(result, pageNumber);
        this.totalFiles = result.totalCount;
      });
  }
 
  protected delete(file: FileUploadDto): void {
    abp.message.confirm(
      this.l("DeleteWarningMessage", file.fileName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._fileUploadService.delete(file.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
}
 
 