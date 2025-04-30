 
import { Component, Injector } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { FileServiceProxy, FileUploadDto} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import {  EventEmitter, Output } from "@angular/core";
 
 
@Component({
  selector: 'app-create-fileupload-dialog',
  templateUrl: './create-fileupload-dialog.component.html',
  styleUrls: ['./create-fileupload-dialog.component.css']
})
export class CreateFileuploadDialogComponent extends AppComponentBase {
  saving = false;
  department = new FileUploadDto ();
  @Output() onSave = new EventEmitter<any>(); // Make sure DepartmentDto has name, code, description
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _fileservice: FileServiceProxy
  ) {
    super(injector);
  }
 
  save(): void {
    this.saving = true;
 
    this._fileservice
      .uploadFile(this.department)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.department.fileName = file.name;
  
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1]; // Extract base64 part
        this.department.filePath = base64Data;
      };
      reader.readAsDataURL(file);
    }
  }
    
  }

 
 
 