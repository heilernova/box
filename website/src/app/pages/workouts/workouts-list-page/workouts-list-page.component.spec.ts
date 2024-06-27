import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsListPageComponent } from './workouts-list-page.component';

describe('WorkoutsListPageComponent', () => {
  let component: WorkoutsListPageComponent;
  let fixture: ComponentFixture<WorkoutsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
