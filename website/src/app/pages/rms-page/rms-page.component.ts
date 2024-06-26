import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '@app/common/session';
import { IRm } from '@app/common/session/User.model';
import { PageModule } from '@app/ui/page';
import { UpdateRmDlgComponent } from '@app/ui/update-rm-dlg/update-rm-dlg.component';

@Component({
  selector: 'app-rms-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PageModule,
  ],
  templateUrl: './rms-page.component.html',
  styleUrl: './rms-page.component.scss'
})
export class RmsPageComponent {
  private readonly _session = inject(SessionService);
  private readonly _matDialog = inject(MatDialog);

  public readonly list = signal<IRm[]>([]);

  constructor(){
    this._session.changeUser.subscribe(value => {
      if (value){
        value.getRMs().then(list => {
          this.list.set(list);
        })
      }
    })
  }

  onClickUpdate(rm: IRm): void {
    this._matDialog.open(UpdateRmDlgComponent, { data: rm, width: '100%', maxWidth: '400px' })
  }
}
