import { Injectable, inject } from '@angular/core';
import { DataBase } from '../data.base';
import { ApiCountriesService } from '@app/common/api/locations';

@Injectable({
  providedIn: 'root'
})
export class DataCountriesService extends DataBase<ICountry> {
  private readonly _api = inject(ApiCountriesService);

  getAll(refresh?: boolean): Promise<ICountry[]> {
    return new Promise((resolve, reject) => {

      if (!refresh && this._data.length > 0){
        resolve(this.getData());
        return;
      }

      this._api.getAll().subscribe({
        next: list => {
          this.setData(list);
          resolve(list);
        },error: err => {
          resolve([]);
        }
      })
    })
  }
}

export interface ICountry {
  code: string;
  name: string;
}
