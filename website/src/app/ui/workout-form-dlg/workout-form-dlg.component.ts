import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiWorkoutsService } from '@app/common/api/workouts/workouts.service';
import { DataWorkoutsService, Workout } from '@app/common/data/workouts';
import { MessageService } from '../message';

@Component({
  selector: 'app-workout-form-dlg',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './workout-form-dlg.component.html',
  styleUrl: './workout-form-dlg.component.scss'
})
export class WorkoutFormDlgComponent {
  private readonly _dataWorkouts = inject(DataWorkoutsService);
  private readonly _message = inject(MessageService);
  private readonly _matDialogRef = inject(MatDialogRef);
  private readonly _workout?: Workout;

  public readonly formGroup = new FormGroup({
    nameInEnglish: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    nameInSpanish: new FormControl<string | null>(null, { nonNullable: true }),
    abbreviation: new FormControl<string | null>(null, {}),
    rm: new FormControl<boolean | null>(null, { validators: Validators.required }),
    pr: new FormControl<boolean | null>(null, { validators: Validators.required }),
  });

  constructor(@Inject(MAT_DIALOG_DATA) data?: Workout){
    this._workout = data;
  }

  onClickSave(): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    let value = this.formGroup.getRawValue();
    
    if (this._workout){

      this._workout.update({
        nameInEnglish: value.nameInEnglish,
        nameInSpanish: value.nameInSpanish,
        abbreviation: value.abbreviation,
        pr: value.pr as boolean,
        rm: value.rm as boolean,
        description: null,
        youTube: null
      }).then(() => {
        this._message.success('Ejercicio actualizado');
      }).catch(err => {
        this._message.error('No se pudo actualizar');
      })
    } else {
      this._dataWorkouts.create({
        nameInEnglish: value.nameInEnglish,
        nameInSpanish: value.nameInSpanish,
        abbreviation: value.abbreviation,
        pr: value.pr as boolean,
        rm: value.rm as boolean,
        description: null,
        youTube: null
      }).then(workout => {
        this._message.success('No se pudo crear el ejercicio');
        this._matDialogRef.close(workout);
      })
      .catch(err => {
        this._message.error('No se pudo crear el ejercicio');
      })
    }
  }
}
