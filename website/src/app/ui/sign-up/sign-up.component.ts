import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SessionService } from '@app/common/session';
import { DataCountriesService } from '@app/common/data/locations';

import { MatInputNumber } from '../mat-input-number';
import { MatInputCellphone } from '../mat-input-cellphone';
import { MessageService } from '../message';


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
    MatInputCellphone,
    MatCheckboxModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private readonly _dataCountries = inject(DataCountriesService);
  private readonly _session = inject(SessionService);
  private readonly _router = inject(Router);
  private readonly _message = inject(MessageService);

  public readonly countries = signal<any[]>([]);

  public readonly formGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    alias: new FormControl<string>('', { nonNullable: true  }),
    birthdate: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    sex: new FormControl<'M' | 'F' | null>(null, { validators: Validators.required }),
    tall: new FormControl<number | null>(null, { validators: Validators.required }),
    weight: new FormControl<number | null>(null, { validators: Validators.required }),
    country: new FormControl<string | null>(null, { validators: Validators.required }),
    email: new FormControl<string | null>(null, { validators: Validators.required }),
    cellphone: new FormControl<string | null>(null, { validators: Validators.required }),
    username: new FormControl<string | null>(null, { validators: Validators.required }),
    password: new FormControl<string | null>(null, { validators: Validators.required }),
    confirmPassword: new FormControl<string | null>(null, { validators: Validators.required }),
  });

  constructor(){
    this._dataCountries.getAll().then(list => {
      this.countries.set(list);
    })
  }

  onSave(): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formGroup.getRawValue();

    if (values.password != values.confirmPassword){
      this._message.error('Las contraseñas con coincide');
      return;
    }

    this._session.signUp({
      name: values.name,
      lastName: values.lastName,
      alias: values.alias.length > 0 ? values.alias : null,
      sex: values.sex as 'M' | 'F',
      email: values.email as string,
      birthdate: values.birthdate,
      cellphone: values.cellphone as string,
      tall: values.tall as number,
      weight: values.weight as number,
      password: values.password as string,
      username: values.username as string,
      country: values.country as string
    }).then(() => {
      this._router.navigate(['/'])
    })
    .catch(() => {

    })

  }
}
