import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRmsService {

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get<APIRmData[]>('profile/rms');
  }
}


export interface APIRmData {
  id: string;
  name_in_english: string,
  name_in_spanish: string,
  abbreviation: string | null,
  slug: string,
  record?: {
    id: string;
    create_at: string;
    weight_in_kilos: number;
    weight_in_pounds: number
  }
}