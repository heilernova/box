import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WodsPageComponent } from './wods-page.component';

describe('WodsPageComponent', () => {
  let component: WodsPageComponent;
  let fixture: ComponentFixture<WodsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WodsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
