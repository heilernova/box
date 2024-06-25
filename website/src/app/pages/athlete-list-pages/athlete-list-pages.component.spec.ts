import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteListPagesComponent } from './athlete-list-pages.component';

describe('AthleteListPagesComponent', () => {
  let component: AthleteListPagesComponent;
  let fixture: ComponentFixture<AthleteListPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteListPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthleteListPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
