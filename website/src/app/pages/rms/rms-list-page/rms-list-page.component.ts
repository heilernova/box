import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SessionService } from '@app/common/session';
import { User } from '@app/common/session/User.model';
import { PageModule } from '@app/ui/page';
import { RmPreviewDlgComponent } from '@app/ui/rm-preview-dlg/rm-preview-dlg.component';

@Component({
  selector: 'app-rms-list-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './rms-list-page.component.html',
  styleUrl: './rms-list-page.component.scss'
})
export class RmsListPageComponent {
  private readonly _router = inject(Router);
  private _matDialog = inject(MatDialog);
  private _session = inject(SessionService);
  private _inputSearchValue: string = '';
  private _listBase: any[] = [];
  private _user: User | null = null;
  public readonly list = signal<any[]>([]);


  constructor(){
    this._session.changeUser.subscribe(value => {
      if (value){
        this._user = value;
        value.getRMs().then(list => {
          this._listBase = list.sort((a, b) => ((a.record ? 0 : 1) - (b.record ? 0 : 1)));
          this.list.set(list);
        })
      } else {
        this._router.navigate(['/']);
      }
    })
  }

  get inputValue(){
    return this._inputSearchValue;
  }
  set inputValue(value: string){

    if (value){
      let result = this._listBase.filter(x => x.nameInEnglish.toLowerCase().includes(value.toLocaleLowerCase()) || x.abbreviation?.toLowerCase().includes(value.toLowerCase()) || x.nameInSpanish?.toLowerCase().includes(value.toLowerCase()) )
      this.list.set(result);
    } else {
      this.list.set(this._listBase);
    }
    this._inputSearchValue = value;
  }

  onClickReloadRMs(): void {
    if (this._user){
      this._user.getRMs(true).then(list => {
        this._listBase = list.sort((a, b) => ((a.record ? 0 : 1) - (b.record ? 0 : 1)));;
        this.list.set(list);
      })
    }
  }
  
  onClickOpenPreview(data: any): void {
    this._matDialog.open(RmPreviewDlgComponent, { data, width: 'calc(100% - 1em)', maxWidth: 'calc(700px - 1em' });
  }
}
