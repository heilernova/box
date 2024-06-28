import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCountriesService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<APICountry[]> {
    return this._http.get<APICountry[]>(`locations/countries`);
  }
}


export interface APICountry {
  code: string;
  name: string;
}