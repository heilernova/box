import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from '@app/common/session';
import { User } from '@app/common/session/User.model';

import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private readonly _session = inject(SessionService);
  public readonly user = signal<User| null>(null);
  public readonly navItems = signal<{ name: string, link: string }[]>([]);

  constructor(){
    this._session.changeUser.subscribe(value => {
      this.user.set(value);
      if (value){
        this.navItems.set([{ name:'rms', link: 'rms'  }]);
      } else {
        this.navItems.set([]);
      }
    })
  }

  onClickLogout(): void {
    this._session.logout();
  }
}
