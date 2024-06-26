import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputNumber } from '../mat-input-number';
import { MatInputCellphone } from '../mat-input-cellphone';
import { SessionService } from '@app/common/session';
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
  private readonly _session = inject(SessionService);
  private readonly _router = inject(Router);

  public readonly formGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    birthdate: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    sex: new FormControl<'M' | 'F' | null>(null, { validators: Validators.required }),
    tall: new FormControl<number | null>(null, { validators: Validators.required }),
    weight: new FormControl<number | null>(null, { validators: Validators.required }),
    email: new FormControl<string | null>(null, { validators: Validators.required }),
    cellphone: new FormControl<string | null>(null, { validators: Validators.required }),
    username: new FormControl<string | null>(null, { validators: Validators.required }),
    password: new FormControl<string | null>(null, { validators: Validators.required }),
    confirmPassword: new FormControl<string | null>(null, { validators: Validators.required }),
  });

  constructor(){

  }

  onSave(): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formGroup.getRawValue();

    this._session.signUp({
      name: values.name,
      lastName: values.lastName,
      sex: values.sex as 'M' | 'F',
      email: values.email as string,
      birthdate: values.birthdate,
      cellphone: values.cellphone as string,
      tall: values.tall as number,
      weight: values.weight as number,
      password: values.password as string,
      username: values.username as string,
    }).then(() => {
      this._router.navigate(['/'])
    })
    .catch(() => {

    })

  }
}
