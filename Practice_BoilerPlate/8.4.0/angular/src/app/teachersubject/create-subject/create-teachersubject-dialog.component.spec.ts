import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeachersubjectDialogComponent } from './create-teachersubject-dialog.component';

describe('CreateTeachersubjectDialogComponent', () => {
  let component: CreateTeachersubjectDialogComponent;
  let fixture: ComponentFixture<CreateTeachersubjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeachersubjectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeachersubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
