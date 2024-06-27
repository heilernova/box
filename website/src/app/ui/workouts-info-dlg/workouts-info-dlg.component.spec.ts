import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsInfoDlgComponent } from './workouts-info-dlg.component';

describe('WorkoutsInfoDlgComponent', () => {
  let component: WorkoutsInfoDlgComponent;
  let fixture: ComponentFixture<WorkoutsInfoDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsInfoDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutsInfoDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
