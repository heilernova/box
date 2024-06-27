import { Component, Inject, signal } from '@angular/core';
import { Athlete } from '@app/common/data/athletes';
import { AgePipe } from '@app/common/pipes';
import { IRm } from '@app/common/session/User.model';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-athlete-preview-dlg',
  standalone: true,
  imports: [
    MatDialogModule,
    AgePipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './athlete-preview-dlg.component.html',
  styleUrl: './athlete-preview-dlg.component.scss'
})
export class AthletePreviewDlgComponent {
  public readonly rms = signal<IRm[]>([]);
  public readonly loadingRMs = signal<boolean>(true);
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Athlete){

    this.data.getRMs().then(list => {      
      this.rms.set(list.filter(x => x.record));
      this.loadingRMs.set(false);
    })
  }
}
