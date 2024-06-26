import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { IRm } from '@app/common/session/User.model';
import { MatInputNumber } from '../mat-input-number';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIRmRegisterData, ApiRmsService } from '@app/common/api/rms';
import { MessageService } from '../message';

@Component({
  selector: 'app-update-rm-dlg',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatInputNumber,
    MatSelectModule
  ],
  templateUrl: './update-rm-dlg.component.html',
  styleUrl: './update-rm-dlg.component.scss'
})
export class UpdateRmDlgComponent {
  private readonly _apiRMS = inject(ApiRmsService);
  private readonly _message = inject(MessageService);
  private readonly _matDialogRef = inject(MatDialogRef<UpdateRmDlgComponent>);


  public readonly workoutName = signal<string>('');
  public readonly formGroup = new FormGroup({
    unit: new FormControl<'kilos' | 'pounds'>('kilos', { nonNullable: true, validators: Validators.required }),
    value: new FormControl<number>(0, { nonNullable: true, validators: Validators.required })
  });

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: IRm){
    this.workoutName.set(data.nameInEnglish);
  }

  onClickSave(): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    
    let formValues = this.formGroup.getRawValue();
    let weightInKilos: number;
    let weightInPounds: number;

    if (formValues.unit == 'kilos'){
      weightInKilos = formValues.value;
      weightInPounds = Math.round(formValues.value * 2.20462);
    } else {
      weightInPounds = formValues.value;
      weightInKilos = Math.round(formValues.value / 2.20462);
    }

    console.log(formValues);
    this._apiRMS.register({ 
      workout_id: this.data.id,
      weight_in_kilos: weightInKilos,
      weight_in_pounds: weightInPounds
    }).subscribe({
      next: res => {
        this.data.record = {
          id: res.id,
          createAt: res.create_at,
          weightInKilos: res.weight_in_kilos,
          weightInPounds: res.weight_in_pounds
        }
        this._message.success('RM actualizado');
        this._matDialogRef.close();
      },
      error: err => {
        this._message.error('No se pudo realizar el registro');
      }
    })
  }
}
