import { WorkoutsService } from '@app/common/models/workouts';
import { IWorkout } from '@app/common/models/workouts/workouts.interfaces';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkoutCreateDto } from './dto/workout-create.dto';
import { WorkoutPipe } from '@app/pipes';
import { WorkoutUpdateDto } from './dto/workout-update.dto';

@Controller('workouts')
export class WorkoutsController {
    constructor(
        private readonly _workouts: WorkoutsService
    ){}

    @Post()
    async create(@Body() data: WorkoutCreateDto){
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

    @Patch(':slug')
    async update(@Param('slug', WorkoutPipe) workout: IWorkout, @Body() data: WorkoutUpdateDto){
        await this._workouts.update(workout.id, data);
    }
}
