import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputNumber } from '../mat-input-number';
import { MatInputCellphone } from '../mat-input-cellphone';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatInputNumber,
    MatInputCellphone
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public readonly formGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    sex: new FormControl<'M' | 'F' | null>(null, { validators: Validators.required }),
    tall: new FormControl<number | null>(null, { validators: Validators.required }),
    weight: new FormControl<number | null>(null, { validators: Validators.required }),
    email: new FormControl<string | null>(null, { validators: Validators.required }),
    cellphone: new FormControl<string | null>(null, { validators: Validators.required }),
    username: new FormControl<string | null>(null, { validators: Validators.required }),
    password: new FormControl<string | null>(null, { validators: Validators.required }),
    confirmPassword: new FormControl<string | null>(null, { validators: Validators.required }),
  });
}
