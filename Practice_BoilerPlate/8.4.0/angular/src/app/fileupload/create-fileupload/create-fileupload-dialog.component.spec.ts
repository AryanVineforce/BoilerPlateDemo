import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFileuploadDialogComponent } from './create-fileupload-dialog.component';

describe('CreateFileuploadDialogComponent', () => {
  let component: CreateFileuploadDialogComponent;
  let fixture: ComponentFixture<CreateFileuploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFileuploadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFileuploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
