import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsInfoPageComponent } from './gyms-info-page.component';

describe('GymsInfoPageComponent', () => {
  let component: GymsInfoPageComponent;
  let fixture: ComponentFixture<GymsInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymsInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymsInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
