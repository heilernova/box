import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsPageComponent } from './rms-page.component';

describe('RmsPageComponent', () => {
  let component: RmsPageComponent;
  let fixture: ComponentFixture<RmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
