import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputCellphone } from './mat-input-cellphone.component';

describe('MatInputCellphoneComponent', () => {
  let component: MatInputCellphone;
  let fixture: ComponentFixture<MatInputCellphone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatInputCellphone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputCellphone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
