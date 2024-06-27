import { IAthletePlain } from "./athletes.interface";

export class Athlete {
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
    public readonly data: { rms: any[] } = { rms: [] }

    constructor(data: IAthletePlain){
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
    }
}