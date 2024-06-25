import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiWorkoutsService } from '@app/common/api/workouts/workouts.service';

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
  private _apiWorkouts = inject(ApiWorkoutsService);
  private readonly _matDialogRef = inject(MatDialogRef);
  public readonly formGroup = new FormGroup({
    nameInEnglish: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    nameInSpanish: new FormControl<string | null>(null, { nonNullable: true }),
    abbreviation: new FormControl<string | null>(null, {}),
    rm: new FormControl<boolean | null>(null, { validators: Validators.required }),
    pr: new FormControl<boolean | null>(null, { validators: Validators.required }),
  });

  onClickSave(): void {
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }
    let value = this.formGroup.getRawValue();
    console.log(value);

    this._apiWorkouts.create({
      name_in_english: value.nameInEnglish,
      name_in_spanish: value.nameInSpanish,
      abbreviation: value.abbreviation,
      pr: value.pr as boolean,
      rm: value.rm as boolean
    }).subscribe({
      next: res => {
        this._matDialogRef.close();
      },
      error: err => {
        
      }
    })

    
  }
}
