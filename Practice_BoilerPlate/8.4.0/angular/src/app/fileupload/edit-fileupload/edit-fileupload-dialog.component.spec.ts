import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileuploadDialogComponent } from './edit-fileupload-dialog.component';

describe('EditFileuploadDialogComponent', () => {
  let component: EditFileuploadDialogComponent;
  let fixture: ComponentFixture<EditFileuploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFileuploadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFileuploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
