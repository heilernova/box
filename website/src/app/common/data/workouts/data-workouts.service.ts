import { Injectable, inject } from '@angular/core';
import { DataBase } from '../data.base';
import { APIWorkout, ApiWorkoutsService } from '@app/common/api/workouts/workouts.service';
import { isUUID } from '@app/common/utils';

@Injectable({
  providedIn: 'root'
})
export class DataWorkoutsService extends DataBase<Workout> {
  private _api = inject(ApiWorkoutsService);

  private parseAPIData(data: APIWorkout){
    return new Workout(parseAPIDataToWorkoutData(data), this._api);
  }

  getAll(): Promise<Workout[]> {
    return new Promise((resolve, reject) => {
      if (this._loaded){
        resolve(this.getData());
        return;
      }

      this._api.getAll().subscribe({
        next: list => {
          this.setData(list.map(x => this.parseAPIData(x)));
          resolve(this.getData())
        },
        error: err => {
          resolve([]);
        }
      })
    })
  }

  get(value: string): Promise<Workout | undefined> {
    return new Promise((resolve) => {
      let workout: Workout | undefined = this._data.find(x => isUUID(value) ? x.id == value : x.slug == value);
      if (workout){
        resolve(workout);
        return;
      }

      this._api.get(value).subscribe({
        next: res => {
          workout = this.parseAPIData(res);
          this.push(workout);
          resolve(workout);
        },
        error: err => {
          resolve(undefined);
        }
      })
    })
  }

  create(data: IWorkoutCreateData): Promise<Workout> {
    return new Promise((resolve, reject) => {
      this._api.create({
        name_in_english: data.nameInEnglish,
        name_in_spanish: data.nameInSpanish,
        abbreviation: data.abbreviation,
        pr: data.pr ?? false,
        rm: data.rm ?? false,
        description: data.description,
        youtube: data.youTube
      })
      .subscribe({
        next: res => {
          let workout = this.parseAPIData(res);
          this.push(workout);
          resolve(workout);
        },
        error: err => {
          reject(err);
        }
      })
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._api.delete(id).subscribe({
        next: () => {
          let index = this._data.findIndex(x => x.id == id);
          if (index > -1){
            this._data.splice(index, 1);
          }
          resolve();
        },
        error: err => {
          reject(err);
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

export interface IWorkoutCreateData {
  nameInEnglish: string,
  nameInSpanish: string | null,
  abbreviation: string | null,
  rm?: boolean,
  pr?: boolean,
  youTube: string | null,
  description: string | null
}

export const parseAPIDataToWorkoutData = (data: APIWorkout): IWorkoutData => {
  return {
    id: data.id,
    createAt: new Date(data.create_at),
    updateAt: new Date(data.update_at),
    nameInEnglish: data.name_in_english,
    nameInSpanish: data.name_in_spanish,
    abbreviation: data.abbreviation,
    pr: data.pr,
    rm: data.rm,
    description: data.description,
    slug: data.slug,
    youTube: data.youtube
  }
}

export class Workout {
  private _api:  ApiWorkoutsService;
  public readonly id: string;
  public readonly createAt: Date;
  public readonly updateAt: Date;
  public readonly nameInEnglish: string;
  public readonly nameInSpanish: string | null;
  public readonly abbreviation: string | null;
  public readonly slug: string;
  public readonly rm: boolean;
  public readonly pr: boolean;
  public readonly youTube: string | null;
  public readonly description: string | null;

  constructor(data: IWorkoutData, api: ApiWorkoutsService){
    this._api = api;
    this.id = data.id;
    this.createAt = data.createAt;
    this.updateAt = data.updateAt;
    this.nameInEnglish = data.nameInEnglish;
    this.nameInSpanish = data.nameInSpanish;
    this.abbreviation = data.abbreviation;
    this.slug = data.slug;
    this.rm = data.rm;
    this.pr = data.pr;
    this.youTube = data.youTube;
    this.description = data.description;
  }

  update(data: { nameInEnglish?: string, nameInSpanish?: string | null, abbreviation?: string | null, rm?: boolean, pr?: boolean, youTube?: string | null, description?: string | null  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this._api.update(this.id, {
        name_in_english: data.nameInEnglish ?? this.nameInEnglish,
        name_in_spanish: data.nameInSpanish ?? this.nameInSpanish,
        abbreviation: data.abbreviation ?? this.abbreviation,
        rm: data.rm ?? this.rm,
        pr: data.pr ?? this.pr,
        youtube: data.youTube,
        description: data.description
      }).subscribe({
        next: res => {
          let data = parseAPIDataToWorkoutData(res);
          let properties: PropertyDescriptorMap = {};
          Object.entries(data).forEach(entry => {
            properties[entry[0]] = {
              value: entry[1],
              writable: false
            }
          });

          Object.defineProperties(this, properties);

          resolve();
        },
        error: err => {
          reject(err);
        }
      });
    })
  }
}