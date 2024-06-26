import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from './message-box.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  private readonly _matDialog = inject(MatDialog);
  constructor() { }

  confirm(data: { message?: string, title?: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._matDialog.open(MessageBoxComponent,{ data }).afterClosed().subscribe((res: boolean | undefined) => {
        resolve(res ?? false);
      })
    })
  }
}
