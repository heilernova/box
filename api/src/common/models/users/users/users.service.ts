import { Injectable } from '@nestjs/common';
import { ConnectionDbService } from '@app/common/connection-db';
import { capitalize } from '@app/common/utils';
import { hashSync } from 'bcrypt';
import { IUser, IUserCreate, IUserDbRow, IUserUpdate, UserRole, UserState } from './users.interfaces';
import { isEmail, isUUID } from 'class-validator';
import { UUID } from 'crypto';

export type FilterUsers = { isCoach?: boolean, role?: UserRole, status?: UserState };

@Injectable()
export class UsersService {
    constructor(private readonly _db: ConnectionDbService){}

    private parseValues<T = IUserCreate | IUserUpdate>(value: IUserCreate | IUserUpdate): T {
        if (value.email) value.email = value.email.toLowerCase();
        if (value.name) value.name = capitalize(value.name);
        if (value.last_name) value.last_name = capitalize(value.last_name);
        if (value.password) value.password = hashSync(value.password, 10);
        return value as T;
    }

    async create(data: IUserCreate): Promise<IUser> {
        return (await this._db.insert<IUserDbRow>('users', this.parseValues(data))).rows[0];
    }

    async get(value: string): Promise<IUser | undefined> {
        let sql: string = 'select * from users where ' + (isUUID(value) ? 'id = $1' : (isEmail(value) ? 'email = lower($1)' : 'lower(username) = lower($1)'));
        return  (await this._db.query<IUserDbRow>(sql, [value])).rows[0] ?? undefined;
    }

    async getAll(filter?: FilterUsers): Promise<IUser[]> {
        let conditions: string[] = [];
        let params: any[] = [];
        if (filter?.isCoach) conditions.push(`is_coach = $${params.push(filter.isCoach)}`);
        if (filter?.role) conditions.push(`role = $${params.push(filter.role)}`);
        if (filter?.status) conditions.push(`status = $${params.push(filter.status)}`);
        return (await this._db.query('select * from users')).rows;
    }

    async update(id: UUID, values: IUserUpdate): Promise<boolean> {
        return (await this._db.update('users', ['id = $1', [id]], this.parseValues(values))).rowCount == 1;
    }

    async delete(id: UUID): Promise<boolean> {
        return (await this._db.delete('users', ['id = $1', [id]])).rowCount == 1;
    }
}
