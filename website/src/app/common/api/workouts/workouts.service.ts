import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkoutsService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<APIWorkout[]>{
    return this._http.get<APIWorkout[]>('workouts');
  }
}


export interface APIWorkout {
  id: string,
  create_at: string,
  update_at: string,
  name_in_english: string,
  name_in_spanish: string,
  abbreviation: string | null,
  slug: string,
  rm: boolean,
  pr: boolean,
  youtube: string | null,
  description: string | null
}