import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from '@app/common/session';
import { User } from '@app/common/session/User.model';

import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';

const NAV_FOR_WEB: { name: string, icon: string, link: string }[] = [
  { name: 'Ejercicios', icon: 'fa-solid fa-dumbbell', link: '/ejercicios' },
  { name: 'WODs', icon: 'fa-solid fa-weight-hanging', link: '/wods' },
  { name: "Gym's", icon: 'fa-solid fa-box', link: '/gyms' },
  { name: "Atletas", icon: 'fa-solid fa-people-group', link: '/atletas' },
  { name: "Competencias", icon: 'fa-solid fa-medal', link: '/competencias' },
  // { name: "Mis resultados", icon: 'fa-solid fa-chart-line', link: '/mis-resultados' },
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private readonly _session = inject(SessionService);
  public readonly user = signal<User| null>(null);
  public readonly navItems = signal<{ name: string, link: string }[]>([]);
  public readonly navForWeb = signal<{ name: string, icon: string, link: string }[]>(NAV_FOR_WEB);

  constructor(){
    this._session.changeUser.subscribe(value => {
      this.user.set(value);
      if (value){
        this.navForWeb.update(list => [{ name: 'RMs', link: 'rms', icon: 'fa-solid fa-clipboard-list' } ,...list])
      } else {
        this.navForWeb.update(list => {
          list.splice(0, 1);
          return list;
        })
      }
    })
  }

  onClickLogout(): void {
    this._session.logout();
  }
}
