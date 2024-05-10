import { OmitBy, PartialBy } from '@app/types';
import { UUID } from 'crypto';

export type Sex = 'M' | 'F';
export type UserRole = 'admin' | 'user';
export type UserState = 'enable' | 'disable' | 'banned';

export interface IUserDbRow {
    id: UUID;
    create_at: Date;
    update_at: Date;
    status: UserState;
    role: UserRole;
    is_coach: boolean;
    username: string;
    name: string;
    last_name: string;
    sex: Sex;
    email: string;
    birthdate: Date;
    cellphone: string;
    tall: number;
    weight: number;
    country: string;
    password: string;
    permissions: string[]
}

export interface IUserCreate extends PartialBy<OmitBy<IUserDbRow, 'id' | 'update_at' | 'create_at'>, 'status' | 'role' | 'is_coach'>{}
export interface IUserUpdate extends Partial<IUserCreate> {}
export interface IUser extends IUserDbRow {}