import { Platform } from '@angular/cdk/platform';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from '@app/ui/message';
import { MessageBoxService } from '@app/ui/message-box';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss'
})
export class MenuPageComponent {
  private readonly _sw = inject(SwUpdate);
  private readonly _platform = inject(Platform);
  private readonly _messageBox = inject(MessageBoxService);

  public readonly swEnable = signal<boolean>(false);

  constructor(){
    this.swEnable.set(this._sw.isEnabled);
  }

  onClickUpdate():void {
    if (this._platform.isBrowser){
      if (typeof window == 'object'){
        if (this._sw.isEnabled){
          this._sw.checkForUpdate().then(res => {
            if (res){
              this._messageBox.confirm({ title: 'Hay una actualización disponible' }).then(() => {
                this._sw.activateUpdate().then(() => {
                  location.reload();
                })
              });
            } else {
              this._messageBox.confirm({ title: 'No hay actualizaciones disponibles' });
            }
          })
        }
      }
    }
  }
}
