import { WorkoutsService } from '@app/common/models/workouts';
import { IWorkout } from '@app/common/models/workouts/workouts.interfaces';
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';

import { WorkoutPipe } from '@app/pipes';
import { Permission, RequirePermissions, SessionAuthGuard } from '@app/common/session';

import { WorkoutCreateDto } from './dto/workout-create.dto';
import { WorkoutUpdateDto } from './dto/workout-update.dto';

@Controller('workouts')
export class WorkoutsController {
    constructor(
        private readonly _workouts: WorkoutsService
    ){}

    @Post()
    @UseGuards(SessionAuthGuard)
    @RequirePermissions(Permission.WORKOUT_CREATE)
    async create(@Body() data: WorkoutCreateDto){
        let nameValid = await this._workouts.nameValid(data.name_in_english);
        if (!nameValid) throw new HttpException(`Ya hay un ejercicio ${data.name_in_english}` , 400);
        return this._workouts.create(data);
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
    async update(@Param('slug', WorkoutPipe) workout: IWorkout, @Body() data: WorkoutUpdateDto){
        await this._workouts.update(workout.id, data);
    }

    @Delete(':slug')
    async delete(@Param('slug', WorkoutPipe) workout: IWorkout) {
        return this._workouts.delete(workout.id);
    }
}
