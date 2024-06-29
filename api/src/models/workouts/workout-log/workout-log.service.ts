import { ConnectionDbService } from '@app/common/connection-db';
import { OmitBy } from '@app/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutLogService {
    constructor(private readonly _db: ConnectionDbService){}

    async register(data: IWorkoutCreate): Promise<IWorkout> {
        return (await this._db.insert<IWorkout>('select * from workouts_log', data, '*')).rows[0];
    }

    async getAll(filter?: { userId?: string, workoutId?: string }): Promise<IWorkout[]> {
        let sql: string = 'select * from workouts_log';
        let conditions: string[] = [];
        let params: any[] | undefined = [];
        if (filter?.userId) conditions.push(`user_id = $${params.push(filter.userId)}`);
        if (filter?.workoutId) conditions.push(`workout_id = $${params.push(filter.workoutId)}`);
        if (conditions.length > 0){
            sql += ' where ' + conditions.join(' and ');
        } else {
            params = undefined;
        }
        return (await this._db.query(sql, params)).rows;
    }
}

export interface IWorkout {
    id: string;
    create_at: Date;
    user_id: string;
    workout_id: string;
    action: "create" | "update";
    detail: string;
    before: any;
    after: any;
}

export interface IWorkoutCreate extends OmitBy<IWorkout, "id" | "create_at"> {}