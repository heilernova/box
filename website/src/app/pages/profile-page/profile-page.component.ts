import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProfileService } from '@app/common/api/profile';
import { MatInputCellphone } from '@app/ui/mat-input-cellphone';
import { MatInputNumber } from '@app/ui/mat-input-number';
import { MessageService } from '@app/ui/message';
import { PageModule } from '@app/ui/page';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatInputCellphone,
    MatButtonModule,
    MatSelectModule,
    MatInputNumber,
    MatDividerModule,
    PageModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly _apiProfile = inject(ProfileService);
  private readonly _message = inject(MessageService);

  public readonly formGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    alias: new FormControl<string>('', { nonNullable: true }),
    birthdate: new FormControl<any>(null, { validators: [Validators.required] }),
    sex: new FormControl<'M' | 'F' | null>(null, { validators: Validators.required }),
    tall: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    weight: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    email: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    cellphone: new FormControl<string | null>(null, {  validators: Validators.required }),
    username: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  constructor(){
    this._apiProfile.getInfo().subscribe({
      next: res => {
        console.log(res);
        this.formGroup.setValue({
          name: res.name,
          lastName: res.last_name,
          alias: res.alias ?? '',
          birthdate: res.birthdate.substring(0, 10),
          sex: res.sex,
          tall: res.tall,
          weight: res.weight,
          email: res.email,
          cellphone: res.cellphone,
          username: res.username
        })
      },
      error: err => {
        
      }
    })
  }

  onClickSave(): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formGroup.getRawValue();

    this._apiProfile.update({
      name: values.name,
      last_name: values.lastName,
      alias: values.alias.length > 0 ? values.alias : null,
      birthdate: values.birthdate,
      sex: values.sex as 'M' | 'F',
      tall: values.tall,
      weight: values.weight,
      email: values.email,
      username: values.username,
      cellphone: values.cellphone as string
    }).subscribe({
      next: () => {
        this._message.success('Datos actualizados');
      },
      error: err => {
        this._message.error('No se pudo actualizados los datos');
      }
    })
  }
}
