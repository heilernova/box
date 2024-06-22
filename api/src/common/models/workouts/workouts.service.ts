import { Injectable } from '@nestjs/common';
import { ConnectionDbService } from '@app/common/connection-db';
import { convertToSlug } from '@app/common/utils';
import { OmitBy } from '@app/types';
import { isUUID } from 'class-validator';
import { UUID } from 'crypto';
import { IWorkout, IWorkoutCreate, IWorkoutUpdate } from './workouts.interfaces';

@Injectable()
export class WorkoutsService {
    constructor(private readonly _db: ConnectionDbService){}

    private parseValue<T = IWorkoutCreate | IWorkoutUpdate>(values: IWorkoutCreate | IWorkoutUpdate): T {
        if (values.name_in_english) values.slug = convertToSlug(values.name_in_english); 
        return values as T;
    }

    async create(data: OmitBy<IWorkoutCreate, 'slug'>): Promise<IWorkout> {
        return (await this._db.insert('workouts', this.parseValue(data), '*')).rows[0];
    }

    async get(value: string): Promise<IWorkout | undefined> {
        return (await this._db.query(`select * from workouts where ${isUUID(value) ? 'id' : 'slug'} = $1`, [value])).rows[0] ?? undefined;
    }

    async getAll(): Promise<IWorkout[]> {
        return (await this._db.query('select * from workouts')).rows;
    }

    async update(id: UUID, data: IWorkoutUpdate): Promise<boolean> {
        return (await this._db.update('workouts', ['id = $1', [id]], this.parseValue(data))).rowCount == 1;
    }

    async delete(id: UUID): Promise<boolean> {
        return (await this._db.delete('workouts', ['id = $1', [id]])).rowCount == 1;
    }
}
