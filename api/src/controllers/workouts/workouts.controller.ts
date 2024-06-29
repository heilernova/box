import { WorkoutsService } from '@app/common/models/workouts';
import { IWorkout } from '@app/common/models/workouts/workouts.interfaces';
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';

import { WorkoutPipe } from '@app/pipes';
import { ISessionData, Permission, RequirePermissions, Session, SessionAuthGuard } from '@app/common/session';
import { WorkoutLogService } from '@app/models/workouts';

import { WorkoutCreateDto } from './dto/workout-create.dto';
import { WorkoutUpdateDto } from './dto/workout-update.dto';

@Controller('workouts')
export class WorkoutsController {
    constructor(
        private readonly _workouts: WorkoutsService,
        private readonly _workoutsLog: WorkoutLogService
    ){}

    @Post()
    @UseGuards(SessionAuthGuard)
    @RequirePermissions(Permission.WORKOUT_CREATE)
    async create(@Session('data') session: ISessionData,  @Body() data: WorkoutCreateDto){
        let nameValid = await this._workouts.nameValid(data.name_in_english);
        if (!nameValid) throw new HttpException(`Ya hay un ejercicio ${data.name_in_english}`, 400);
        let workout = await this._workouts.create(data);
        this._workoutsLog.register({ user_id: session.id, workout_id: workout.id, action: 'create', before: workout, after: workout, detail: 'Se crear el ejercicio' });
        return workout;
    }
    
    @Get()
    async getAll(){
        return this._workouts.getAll();
    }
    
    @Get(':slug')
    async get(@Param('slug', WorkoutPipe) workout: IWorkout) {
        return workout;
    }
    
    @Put(':slug')
    @UseGuards(SessionAuthGuard)
    @RequirePermissions(Permission.WORKOUT_UPDATE)
    async update(@Session('data') session: ISessionData, @Param('slug', WorkoutPipe) workout: IWorkout, @Body() data: WorkoutUpdateDto){
        let workoutUpdate = await this._workouts.update(workout.id, data);
        this._workoutsLog.register({ user_id: session.id, workout_id: workout.id, action: 'update', before: workout, after: workoutUpdate, detail: 'Se crear el ejercicio' });
    }

    @Delete(':slug')
    async delete(@Param('slug', WorkoutPipe) workout: IWorkout) {
        await this._workouts.delete(workout.id);
    }
}
