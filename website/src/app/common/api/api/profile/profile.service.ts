import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  getInfo(): Observable<APIProfileInfo> {
    return this._http.get<APIProfileInfo>('profile');
  }

  update(data: APIProfileUpdate): Observable<APIProfileUpdate> {
    return this._http.put<APIProfileUpdate>('profile', data);
  }

  updatePassword(data: { password: string, newPassword: string }): Observable<void> {
    return this._http.put<void>('profile/password', data);
  }
}


export interface APIProfileInfo {
  name: string;
  last_name: string;
  is_coach: boolean;
  birthdate: string;
  sex: "M" | "F";
  tall: number;
  weight: number;
  username: string;
  email: string;
  cellphone: string; 
}

export interface APIProfileUpdate {
  name?: string;
  last_name?: string;
  birthdate?: string;
  sex?: "M" | "F";
  tall?: number;
  weight?: number;
  username?: string;
  email?: string;
  cellphone?: string; 
}