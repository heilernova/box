import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Athlete } from '@app/common/data/athletes';
import { AgePipe } from '@app/common/pipes';

@Component({
  selector: 'app-athlete-preview-dlg',
  standalone: true,
  imports: [
    MatDialogModule,
    AgePipe
  ],
  templateUrl: './athlete-preview-dlg.component.html',
  styleUrl: './athlete-preview-dlg.component.scss'
})
export class AthletePreviewDlgComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Athlete){}
}
