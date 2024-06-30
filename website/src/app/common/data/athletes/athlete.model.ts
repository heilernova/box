import { ApiAthletesService } from "@app/common/api/athletes";
import { IAthletePlain } from "./athletes.interface";
import { IRm } from "@app/common/session/User.model";

export class Athlete {
    private readonly _api: ApiAthletesService;
    public readonly username: string;
    public readonly name: string;
    public readonly lastName: string;
    public readonly alias: string | null;
    public readonly sex: "M" | "F";
    public readonly isCoach: boolean;
    public readonly tall: number;
    public readonly weight: number;
    public readonly country: "CO";
    public readonly birthdate: Date;
    public readonly category: { id: number, name: string };
    private readonly data: { rms: IRm[] } = { rms: [] }

    constructor(data: IAthletePlain, api: ApiAthletesService){
        this._api = api;
        this.username = data.username;
        this.name = data.name,
        this.lastName = data.lastName;
        this.alias = data.alias;
        this.sex = data.sex;
        this.isCoach = data.isCoach;
        this.tall = data.tall;
        this.weight = data.weight;
        this.country = data.country;
        this.birthdate = new Date(data.birthdate);

        if (data.category == 1){
            this.category = {
                id: data.category,
                name: 'Principiante'
            }
        } else if (data.category == 2){
            this.category = {
                id: data.category,
                name: 'Intermedio'
            }
        } else if (data.category == 3){
            this.category = {
                id: data.category,
                name: 'Avanzado'
            }
        }  else if (data.category == 4){
            this.category = {
                id: data.category,
                name: 'RX'
            }
        }   else if (data.category == 5){
            this.category = {
                id: data.category,
                name: 'Elite'
            }
        } else {
            this.category = {
                id: 0,
                name: 'Sin definir'
            }
        }
    }


    getRMs(refresh?: boolean): Promise<IRm[]>{
        return new Promise((resolve) => {
            if (!refresh && this.data.rms.length > 0){
                resolve(this.data.rms);
                return;
            }
            this._api.getRMs(this.username).subscribe({
                next: res => {
                    this.data.rms = res.map(x => {

                        return {
                            id: x.id,
                            nameInEnglish: x.name_in_english,
                            nameInSpanish: x.name_in_spanish,
                            slug: x.slug,
                            abbreviation: x.abbreviation,
                            record: x.record ? {
                                id: x.record.id,
                                createAt: x.record.create_at,
                                weightInKilos: x.record.weight_in_kilos,
                                weightInPounds: x.record.weight_in_pounds,
                            } : undefined
                        }
                    });

                    resolve(this.data.rms);
                },
                error: err => {
                    resolve([]);
                }
            })
        })
    }
}