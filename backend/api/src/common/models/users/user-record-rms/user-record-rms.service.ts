import { ConnectionDbService } from '@app/common/connection-db';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class UserRecordRmsService {
    constructor(private readonly _db: ConnectionDbService){}

    async get(id: UUID): Promise<IUserRecordRM[]> {
        let sql: string = 'select record_id, workout_id, create_at, name_in_english, name_in_spanish, slug, abbreviation, weight_in_kilos, weight_in_pounds from vi_users_rms where user_id = $1';
        return (await this._db.query(sql, [id])).rows;
    }
}


export interface IUserRecordRM {
    record_id: UUID;
    workout_id: UUID;
    create_at: Date;
    name_in_english: string;
    name_in_spanish: string | null;
    slug: string;
    abbreviation: string | null;
    weight_in_kilos: number;
    weight_in_pounds: number;
}