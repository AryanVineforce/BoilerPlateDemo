import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnrollmentDialogComponent } from './edit-enrollment-dialog.component';

describe('EditEnrollmentDialogComponent', () => {
  let component: EditEnrollmentDialogComponent;
  let fixture: ComponentFixture<EditEnrollmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEnrollmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEnrollmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
