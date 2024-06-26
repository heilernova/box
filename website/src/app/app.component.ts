import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './common/session';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _sw = inject(SwUpdate);
  private readonly _session = inject(SessionService);
  private readonly _plat = inject(Platform);

  constructor(){
    this._session.init();
    if (this._plat.isBrowser){
      if (typeof window == 'object'){
        if (this._sw.isEnabled){
          this._sw.checkForUpdate().then(res => {
            if (res){
              alert('Se actualizara la app')
              this._sw.activateUpdate().then(() => {
                location.reload();
              })
            }
          })
        }
      }
    }
  }
}
