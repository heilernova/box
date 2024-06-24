import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputNumber } from './mat-input-number.component';

describe('MatInputNumberComponent', () => {
  let component: MatInputNumber;
  let fixture: ComponentFixture<MatInputNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatInputNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
