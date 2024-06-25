import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutFormDlgComponent } from './workout-form-dlg.component';

describe('WorkoutFormDlgComponent', () => {
  let component: WorkoutFormDlgComponent;
  let fixture: ComponentFixture<WorkoutFormDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutFormDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutFormDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
