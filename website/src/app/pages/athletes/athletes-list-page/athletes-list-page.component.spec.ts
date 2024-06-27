import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletesListPageComponent } from './athletes-list-page.component';

describe('AthletesListPageComponent', () => {
  let component: AthletesListPageComponent;
  let fixture: ComponentFixture<AthletesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthletesListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthletesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
