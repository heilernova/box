import { Injectable } from '@nestjs/common';
import { ConnectionDbService } from '@app/common/connection-db';
import { UUID } from 'crypto';

@Injectable()
export class UserRecordWeightService {
    constructor(private readonly _db: ConnectionDbService){}

    async getRecords(id: UUID): Promise<IWeightRecord[]> {
        return (await this._db.query<IWeightRecord>('select id, create_at, weight_in_kilos from users_records_weight where user_id = $1', [id])).rows;
    }
}

export interface IWeightRecord {
    id: UUID;
    create_at: Date;
    weight_in_kilos: number
}
