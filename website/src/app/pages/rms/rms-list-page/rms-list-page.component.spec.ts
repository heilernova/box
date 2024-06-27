import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsListPageComponent } from './rms-list-page.component';

describe('RmsListPageComponent', () => {
  let component: RmsListPageComponent;
  let fixture: ComponentFixture<RmsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
