import { Injectable, inject } from '@angular/core';
import { APIAthleteInfo, ApiAthletesService } from '../../api/athletes';

@Injectable({
  providedIn: 'root'
})
export class AthletesDataService {
  private readonly _api = inject(ApiAthletesService);
  constructor() { }

  getAll(): Promise<IAthlete[]> {
    return new Promise((resolve, reject) => {
      this._api.getAll().subscribe({
        next: list => {
          resolve(list.map(x => {
            return {
              username: x.username,
              name: x.name,
              lastName: x.last_name,
              alias: x.alias,
              sex: x.sex,
              tall: x.tall,
              weight: x.weight,
              country: x.country,
              birthdate: new Date(x.birthdate),
              isCoach: x.is_coach
            }
          }));
        },
        error: err => {
          reject(err);
        }
      })
    })
  }
}

export interface IAthlete {
  username: string;
  name: string;
  lastName: string;
  alias: string | null;
  sex: "M" | "F";
  isCoach: boolean;
  tall: number;
  weight: number;
  country: "CO";
  birthdate: Date;
}
