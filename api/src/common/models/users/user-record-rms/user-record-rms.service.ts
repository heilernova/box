import { ConnectionDbService } from '@app/common/connection-db';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class UserRecordRmsService {
    constructor(private readonly _db: ConnectionDbService){}

    async get(id: UUID): Promise<IUserRecordRM[]> {
        let sql: string = 'select a.id as workout_id, a.name_in_english, a.name_in_spanish, a.slug, a.abbreviation, b.record_id, b.create_at,	b.weight_in_kilos,	b.weight_in_pounds from workouts a left join (select * from vi_users_rms where user_id = $1) b on b.workout_id = a.id order by a.name_in_english' //'select record_id, workout_id, create_at, name_in_english, name_in_spanish, slug, abbreviation, weight_in_kilos, weight_in_pounds from vi_users_rms where user_id = $1';
        return (await this._db.query(sql, [id])).rows;
    }

    async register(data: { workout_id: UUID, user_id: UUID, weight_in_kilos: number, weight_in_pounds: number }): Promise<{ id: UUID, create_at: Date, weight_in_kilos: number, weight_in_pounds: number }> {
        return (await this._db.insert('users_records_rm', data, 'id, create_at, weight_in_kilos, weight_in_pounds')).rows[0];
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