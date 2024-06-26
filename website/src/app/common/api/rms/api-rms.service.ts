import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRmsService {

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get<APIRmData[]>('profile/rms');
  }

  register(data: { workout_id: string, weight_in_kilos: number, weight_in_pounds: number }): Observable<APIRmRegisterData> {
    return this._http.post<APIRmRegisterData>('profile/rms', data);
  }
}


export interface APIRmData {
  id: string;
  name_in_english: string,
  name_in_spanish: string,
  abbreviation: string | null,
  slug: string,
  record?: APIRmRegisterData
}

export interface APIRmRegisterData {
  id: string,
  create_at: string,
  weight_in_kilos: number,
  weight_in_pounds: number
}