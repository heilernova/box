import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsHomePageComponent } from './gyms-home-page.component';

describe('GymsHomePageComponent', () => {
  let component: GymsHomePageComponent;
  let fixture: ComponentFixture<GymsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymsHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
