import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmPreviewDlgComponent } from './rm-preview-dlg.component';

describe('RmPreviewDlgComponent', () => {
  let component: RmPreviewDlgComponent;
  let fixture: ComponentFixture<RmPreviewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmPreviewDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmPreviewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
