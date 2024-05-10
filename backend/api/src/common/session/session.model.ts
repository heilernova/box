import { UserRole } from "../models/users";
import { ISessionData } from "./session.interfaces";

export class AppSession {
    public readonly token: string;
    public readonly data: {
        id: string;
        username: string;
        role: UserRole
    }

    private readonly _permissions: string[];

    constructor(data: ISessionData, token: string){
        this.token = token;
        this.data = data;
        this._permissions = data.permissions;
    }

    checkPermissions(permissions: string[]): boolean {
        let valid: boolean = true;
        if (this.data.role == 'admin') return true;
        for (let i = 0; i < permissions.length; i++){
            let r: boolean = this._permissions.some(x => x == permissions[i]);
            if (!r) {
                valid = false;
                break;
            }
        }
        return valid;
    }
}