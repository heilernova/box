import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private readonly _http: HttpClient) { }

  signIn(credentials: { username: string, password: string }): Observable<APIAuthResponse> {
    return this._http.post<APIAuthResponse>('sign-in', credentials);
  }

  signUp(data: APIAuthSignUpData): Observable<APIAuthResponse> {
    return this._http.post<APIAuthResponse>('sign-up', data);
  }

  verifySession(token: string): Observable<APIAuthResponse> {
    return this._http.get<APIAuthResponse>('verify-session', { headers: { authorization: `Bearer ${token}` }});
  }
}

export interface APIAuthResponse {
  id: string,
  role: 'admin' | 'user';
  username: string,
  name: string,
  last_name: string,
  alias: string | null,
  is_coach: boolean,
  birthdate: string,
  sex: "M" | "F",
  tall: number,
  weight: number,
  token: string,
  country: string
}


export interface APIAuthSignUpData {
  username: string;
  email: string;
  name: string;
  last_name: string;
  alias: string | null;
  sex: "M" | "F";
  birthdate: Date | string;
  cellphone: string;
  tall: number;
  weight: number;
  country: string;
  password: string;
}