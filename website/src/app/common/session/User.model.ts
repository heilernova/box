import { inject } from "@angular/core";
import { ApiRmsService } from "../api/rms";

export interface IUserData {
    id: string,
    role: 'admin' | 'user';
    username: string,
    name: string,
    lastName: string,
    alias: string | null,
    isCoach: boolean,
    birthdate: string,
    sex: "M" | "F",
    tall: number,
    weight: number,
    token: string,
    country: string;
    rms?: any[];
}

export interface IRm {
    id: string;
    nameInEnglish: string,
    nameInSpanish: string,
    abbreviation: string | null,
    slug: string,
    record?: {
      id: string;
      createAt: string;
      weightInKilos: number;
      weightInPounds: number
    }
}

export interface IRmRecord {
    id: string;
    createAt: string;
    weightInKilos: number;
    weightInPounds: number
}


export enum Permission {
    USERS_CREATE = 'USERS_CREATE',
    USERS_READ = 'USERS_READ',
    USERS_UPDATE = 'USERS_UPDATE',
    USERS_DELETE = 'USERS_DELETE',

    WORKOUT_CREATE = 'WORKOUT_CREATE',
    WORKOUT_READ = 'WORKOUT_READ',
    WORKOUT_UPDATE = 'WORKOUT_UPDATE',
    WORKOUT_DELETE = 'WORKOUT_DELETE',

    GYMS_CREATE = 'GYMS_CREATE',
    GYMS_READ = 'GYMS_READ',
    GYMS_UPDATE = 'GYMS_UPDATE',
    GYMS_DELETE = 'GYMS_DELETE',
}

export class User {
    private readonly _apiRms: ApiRmsService;
    private readonly permissions: string[];

    public readonly id: string;
    public readonly role: 'admin' | 'user';
    public readonly username: string;
    public readonly name: string;
    public readonly alias: string | null;
    public readonly lastName: string;
    public readonly isCoach: boolean;
    public readonly birthdate: Date;
    public readonly sex: "M" | "F";
    public readonly tall: number;
    public readonly weight: number;
    public readonly token: string;
    public readonly country: string;
    private rms: IRm[] = [];
    
    constructor(data: IUserData, apiRms: ApiRmsService){
        this._apiRms = apiRms;
        this.id = data.id;
        this.role = data.role;
        this.username = data.username;
        this.name = data.name;
        this.lastName = data.lastName;
        this.alias = data.alias;
        this.isCoach = data.isCoach;
        this.birthdate = new Date(data.birthdate);
        this.sex = data.sex;
        this.tall = data.tall;
        this.weight = data.weight;
        this.token = data.token;
        this.country = data.country;
        this.permissions = [];
        if (data.rms){
            this.rms = data.rms;
        }
    }

    toJson(): string {
        return JSON.stringify({
            id: this.id,
            role: this.role,
            username: this.username,
            name: this.name,
            lastName: this.lastName,
            alias: this.alias,
            isCoach: this.isCoach,
            birthdate: this.birthdate,
            sex: this.sex,
            tall: this.tall,
            weight: this.weight,
            token: this.token,
            country: this.country,
            rms: this.rms
        })
    }

    checkPermissions(permissions: string[]): boolean {
        let valid: boolean = true;
        if (this.role == 'admin') return true;
        for (let i = 0; i < permissions.length; i++){
            let r: boolean = this.permissions.some(x => x == permissions[i]);
            if (!r) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    getRMs(refresh?: boolean): Promise<IRm[]> {
        return new Promise((resolve) => {
            if (!refresh && this.rms.length > 0){
                resolve(this.rms);
                return;
            }

            this._apiRms.getAll().subscribe({
                next: list => {
                    this.rms = list.map(x => {
                        return {
                            id: x.id,
                            nameInEnglish: x.name_in_english,
                            nameInSpanish: x.name_in_spanish,
                            abbreviation: x.abbreviation,
                            slug: x.slug,
                            record: x.record ? {
                                id: x.record.id,
                                createAt: x.record.create_at,
                                weightInKilos: x.record.weight_in_kilos,
                                weightInPounds: x.record.weight_in_pounds
                            } : undefined
                        }
                    })
                    resolve(this.rms);
                },
                error: err => {
                    resolve(this.rms);
                }
            })
        })
    }
}