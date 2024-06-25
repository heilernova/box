import { Injectable, inject } from '@angular/core';
import { DataBase } from '../data.base';
import { ApiWorkoutsService } from '@app/common/api/workouts/workouts.service';

@Injectable({
  providedIn: 'root'
})
export class DataWorkoutsService extends DataBase<Workout> {
  private _api = inject(ApiWorkoutsService);


  getAll(): Promise<Workout[]> {
    return new Promise((resolve, reject) => {
      if (this._loaded){
        resolve(this.getData());
        return;
      }

      this._api.getAll().subscribe({
        next: list => {
          this.setData(list.map(x => new Workout({
            id: x.id,
            createAt: x.create_at,
            updateAt: x.update_at,
            nameInEnglish: x.name_in_english,
            nameInSpanish: x.name_in_spanish,
            abbreviation: x.abbreviation,
            pr: x.pr,
            rm: x.rm,
            description: x.description,
            slug: x.slug,
            youTube: x.youtube
          })));
          resolve(this.getData())
        },
        error: err => {
          resolve([]);
        }
      })
    })
  }
}

export interface IWorkout {
  id: string,
  createAt: Date,
  updateAt: Date,
  nameInEnglish: string,
  nameInSpanish: string | null,
  abbreviation: string | null,
  slug: string,
  rm: boolean,
  pr: boolean,
  youTube: string | null,
  description: string | null
}

export interface IWorkoutData {
  id: string,
  createAt: string,
  updateAt: string,
  nameInEnglish: string,
  nameInSpanish: string | null,
  abbreviation: string | null,
  slug: string,
  rm: boolean,
  pr: boolean,
  youTube: string | null,
  description: string | null
}

export class Workout {
  id: string;
  createAt: Date;
  updateAt: Date;
  nameInEnglish: string;
  nameInSpanish: string | null;
  abbreviation: string | null;
  slug: string;
  rm: boolean;
  pr: boolean;
  youTube: string | null;
  description: string | null;

  constructor(data: IWorkoutData){
    this.id = data.id;
    this.createAt = new Date(data.createAt);
    this.updateAt = new Date(data.updateAt);
    this.nameInEnglish = data.nameInEnglish;
    this.nameInSpanish = data.nameInSpanish;
    this.abbreviation = data.abbreviation;
    this.slug = data.slug;
    this.rm = data.rm;
    this.pr = data.pr;
    this.youTube = data.youTube;
    this.description = data.description;
  }
}