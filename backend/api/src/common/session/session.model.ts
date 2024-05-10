import { ISessionData } from "./session.interfaces";

export class AppSession {
    public readonly token: string;
    public readonly data: {
        id: string;
        username: string;
    }

    private readonly _permissions: string[];

    constructor(data: ISessionData, token: string){
        this.token = token;
        this.data = data;
        this._permissions = data.permissions;
    }
}