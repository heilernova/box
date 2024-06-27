import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletePreviewDlgComponent } from './athlete-preview-dlg.component';

describe('AthletePreviewDlgComponent', () => {
  let component: AthletePreviewDlgComponent;
  let fixture: ComponentFixture<AthletePreviewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthletePreviewDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthletePreviewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
