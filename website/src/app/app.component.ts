import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './common/session';
import { SwUpdate } from '@angular/service-worker';

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

  constructor(){
    this._session.init();
    this._sw.checkForUpdate().then(res => {
      if (res){
        this._sw.activateUpdate().then(() => {
          location.reload();
        })
      }
    })
  }
}
