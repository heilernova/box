import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { IRm, IRmRecord } from '@app/common/session/User.model';
import { MatInputNumber } from '../mat-input-number';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rm-preview-dlg',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatInputNumber
  ],
  templateUrl: './rm-preview-dlg.component.html',
  styleUrl: './rm-preview-dlg.component.scss'
})
export class RmPreviewDlgComponent {
  public readonly nameInEnglish = signal<string>('');
  public readonly record = signal<IRmRecord | null>(null);

  public formGroup = new FormGroup({
    percentage: new FormControl<number>(0, {  nonNullable: true }),
    value: new FormControl<number>(0, {  nonNullable: true }),
    pounds: new FormControl<number>(0, {  nonNullable: true }),
  })

  constructor(@Inject(MAT_DIALOG_DATA) data: IRm){
    this.nameInEnglish.set(data.nameInEnglish);
    this.record.set(data.record ?? null);

    this.formGroup.controls.percentage.valueChanges.subscribe(value => {
      this.formGroup.controls.value.setValue(Math.round((data.record?.weightInKilos ?? 0) * value));
      this.formGroup.controls.pounds.setValue(Math.round((data.record?.weightInPounds ?? 0) * value));
    })

    if (data.record){
      this.formGroup.setValue({
        percentage: 1,
        value: data.record.weightInKilos,
        pounds: data.record.weightInPounds,
      })
    }
  }
}
