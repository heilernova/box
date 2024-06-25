export interface IUserData {
    id: string,
    role: 'admin' | 'user';
    username: string,
    name: string,
    lastName: string,
    isCoach: boolean,
    birthdate: string,
    sex: "M" | "F",
    tall: number,
    weight: number,
    token: string,
    rms?: any[];
}

export class User {
    public readonly id: string;
    public readonly role: 'admin' | 'user';
    public readonly username: string;
    public readonly name: string;
    public readonly lastName: string;
    public readonly isCoach: boolean;
    public readonly birthdate: Date;
    public readonly sex: "M" | "F";
    public readonly tall: number;
    public readonly weight: number;
    public readonly token: string;
    public rms: any[] = [];
    
    constructor(data: IUserData){
        this.id = data.id;
        this.role = data.role;
        this.username = data.username;
        this.name = data.name;
        this.lastName = data.lastName;
        this.isCoach = data.isCoach;
        this.birthdate = new Date(data.birthdate);
        this.sex = data.sex;
        this.tall = data.tall;
        this.weight = data.weight;
        this.token = data.token;
        if (data.rms){
            this.rms = data.rms;
        }
    }

    toJson(): string {
        return JSON.stringify({
            id: this.id,
            username: this.username,
            name: this.name,
            lastName: this.lastName,
            isCoach: this.isCoach,
            birthdate: this.birthdate,
            sex: this.sex,
            tall: this.tall,
            weight: this.weight,
            token: this.token,
            rms: this.rms
        })
    }
}