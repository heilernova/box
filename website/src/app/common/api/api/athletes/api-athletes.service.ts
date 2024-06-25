import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAthletesService {

  constructor(private _http: HttpClient) { }
  getAll(){
    return this._http.get<APIAthleteInfo[]>('athletes');
  }
}


export interface APIAthleteInfo {
  username: string,
  name: string,
  last_name: string,
  sex: "M" | "F",
  is_coach: boolean,
  tall: number,
  weight: number,
  country: "CO",
  birthdate: string
}