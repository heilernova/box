import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAthletesService {

  constructor(private _http: HttpClient) { }
  getAll(){
    return this._http.get<APIAthleteInfo[]>('athletes');
  }

  getRMs(username: string): Observable<any[]>{
    return this._http.get<any>(`athletes/${username}/rms`);
  }
}


export interface APIAthleteInfo {
  username: string,
  name: string,
  last_name: string,
  alias: string | null,
  sex: "M" | "F",
  is_coach: boolean,
  tall: number,
  weight: number,
  country: "CO",
  category: number,
  birthdate: string
}