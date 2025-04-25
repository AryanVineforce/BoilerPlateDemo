import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachersubjectDialogComponent } from './edit-teachersubject-dialog.component';

describe('EditTeachersubjectDialogComponent', () => {
  let component: EditTeachersubjectDialogComponent;
  let fixture: ComponentFixture<EditTeachersubjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeachersubjectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeachersubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
