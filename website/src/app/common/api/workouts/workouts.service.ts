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

  create(data: APIWorkoutCreate): Observable<APIWorkout> {
    return this._http.post<APIWorkout>('workouts', data);
  }
}


export interface APIWorkout {
  id: string,
  create_at: string,
  update_at: string,
  name_in_english: string,
  name_in_spanish: string | null,
  abbreviation: string | null,
  slug: string,
  rm: boolean,
  pr: boolean,
  youtube: string | null,
  description: string | null
}

export interface APIWorkoutCreate {

  name_in_english: string,
  name_in_spanish: string | null,
  abbreviation: string | null,
  rm: boolean,
  pr: boolean,
  youtube?: string | null,
  description?: string | null
}