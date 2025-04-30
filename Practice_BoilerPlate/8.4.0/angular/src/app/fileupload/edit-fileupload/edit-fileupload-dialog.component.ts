 
import { Component, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { FileGetDto, FileServiceProxy, FileUpdateDto, FileUploadDto} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import {  EventEmitter, Output } from "@angular/core";
@Component({
  selector: 'app-edit-fileupload-dialog',
  templateUrl: './edit-fileupload-dialog.component.html',
  styleUrls: ['./edit-fileupload-dialog.component.css']
})
export class EditFileuploadDialogComponent extends AppComponentBase {
  saving = false;
 
  fileToEdit: FileGetDto;
  @Output() onUpdate= new EventEmitter<any>(); // Make sure DepartmentDto has name, code, description
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _fileservice: FileServiceProxy
  ) {
    super(injector);
  }
  update(): void {
   

    this.saving = true;

    this._fileservice.update(this.fileToEdit).subscribe(
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
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileToEdit.fileName = file.name;
  
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1]; // Extract base64 part
        this.fileToEdit.filePath = base64Data;
      };
      reader.readAsDataURL(file);
    }
  }
}
