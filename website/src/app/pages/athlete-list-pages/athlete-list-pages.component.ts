import { Component, inject, signal } from '@angular/core';
import { AthletesDataService, IAthlete } from '../../common/data/athletes';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-athlete-list-pages',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './athlete-list-pages.component.html',
  styleUrl: './athlete-list-pages.component.scss'
})
export class AthleteListPagesComponent {
  private readonly _dataAthletes = inject(AthletesDataService);

  public readonly list = signal<IAthlete[]>([]);
  constructor(){
    this._dataAthletes.getAll().then(x => {
      this.list.set(x);
    })
  }
}
