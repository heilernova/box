import { Injectable, inject } from '@angular/core';
import { ApiAthletesService } from '@app/common/api/athletes';
import { DataBase } from '../data.base';
import { Athlete } from './athlete.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAthletesService extends DataBase<Athlete> {
  private readonly _api = inject(ApiAthletesService);

  getAll(refresh?: boolean): Promise<Athlete[]> {
    return new Promise((resolve, reject) => {

      if (!refresh && this._loaded){
        resolve(this.getData());
        return;
      }
      
      this._api.getAll().subscribe({
        next: list => {

          let data = list.map(x => {
            return new Athlete({
              username: x.username,
              name: x.name,
              lastName: x.last_name,
              alias: x.alias,
              sex: x.sex,
              tall: x.tall,
              weight: x.weight,
              country: x.country,
              birthdate: x.birthdate,
              isCoach: x.is_coach,
              data: { rms: [] }
            }, this._api)
          });

          this.setData(data);
          resolve(this.getData());
        },
        error: err => {
          reject(err);
        }
      })
    })
  }
}
