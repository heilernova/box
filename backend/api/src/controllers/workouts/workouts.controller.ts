import { WorkoutsService } from '@app/common/models/workouts';
import { IWorkout } from '@app/common/models/workouts/workouts.interfaces';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { WorkoutCreateDto } from './dto/workout-create.dto';
import { WorkoutPipe } from '@app/pipes';
import { WorkoutUpdateDto } from './dto/workout-update.dto';
import { Permission, RequirePermissions, SessionAuthGuard } from '@app/common/session';

@Controller('workouts')
export class WorkoutsController {
    constructor(
        private readonly _workouts: WorkoutsService
    ){}

    @Post()
    @UseGuards(SessionAuthGuard)
    @RequirePermissions(Permission.WORKOUT_CREATE)
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
    @UseGuards(SessionAuthGuard)
    @RequirePermissions(Permission.WORKOUT_UPDATE)
    async update(@Param('slug', WorkoutPipe) workout: IWorkout, @Body() data: WorkoutUpdateDto){
        await this._workouts.update(workout.id, data);
    }
}
