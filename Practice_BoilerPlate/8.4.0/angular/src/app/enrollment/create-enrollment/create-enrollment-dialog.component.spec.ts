import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnrollmentDialogComponent } from './create-enrollment-dialog.component';

describe('CreateEnrollmentDialogComponent', () => {
  let component: CreateEnrollmentDialogComponent;
  let fixture: ComponentFixture<CreateEnrollmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnrollmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEnrollmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
