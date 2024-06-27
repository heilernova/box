import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Athlete } from '@app/common/data/athletes';
import { AgePipe } from '@app/common/pipes';
import { IRm } from '@app/common/session/User.model';

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
  public readonly rms = signal<IRm[]>([]);
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Athlete){
    this.data.getRMs().then(list => {
      this.rms.set(list);
    })
  }
}
