import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRmDlgComponent } from './update-rm-dlg.component';

describe('UpdateRmDlgComponent', () => {
  let component: UpdateRmDlgComponent;
  let fixture: ComponentFixture<UpdateRmDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRmDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRmDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
