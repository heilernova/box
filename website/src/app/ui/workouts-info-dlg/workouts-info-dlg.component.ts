import { Component, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Workout } from '@app/common/data/workouts';

@Component({
  selector: 'app-workouts-info-dlg',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './workouts-info-dlg.component.html',
  styleUrl: './workouts-info-dlg.component.scss'
})
export class WorkoutsInfoDlgComponent {

  public readonly name = signal<string>('');
  public readonly abbreviation = signal<string>('');
  public readonly nameInSpanish = signal<string>('');
  public readonly description = signal<string>('');
  public readonly urlYouTube = signal<string | null>(null);

  constructor(@Inject(MAT_DIALOG_DATA) readonly _workout: Workout){
    this.name.set(_workout.nameInEnglish);
    this.nameInSpanish.set(_workout.nameInSpanish ?? '');
    this.abbreviation.set(_workout.abbreviation ?? '');
    this.description.set(_workout.description ?? '');
    this.urlYouTube.set(_workout.youTube);
  }
}
