import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Athlete, DataAthletesService } from '@app/common/data/athletes';
import { AthletePreviewDlgComponent } from '@app/ui/athlete-preview-dlg/athlete-preview-dlg.component';
import { PageModule } from '@app/ui/page';

@Component({
  selector: 'app-athletes-list-page',
  standalone: true,
  imports: [
    PageModule,
    MatCardModule
  ],
  templateUrl: './athletes-list-page.component.html',
  styleUrl: './athletes-list-page.component.scss'
})
export class AthletesListPageComponent {
  private readonly _matDialog = inject(MatDialog);
  private readonly _dataAthletes  = inject(DataAthletesService);

  public readonly list = signal<Athlete[]>([]);


  constructor(){
    this._dataAthletes.getAll().then(list => {
      this.list.set(list);
    })
  }

  onClickPreview(athlete: Athlete): void {
    this._matDialog.open(AthletePreviewDlgComponent, { data: athlete, width: 'calc(100% - 1em)', maxWidth: '700px' });
  }
}
