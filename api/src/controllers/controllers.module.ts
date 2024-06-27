import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { UsersController } from './users/users.controller';
import { AthletesController } from './athletes/athletes.controller';
import { ProfileRmsController } from './profile-rms/profile-rms.controller';

@Module({
  controllers: [AuthController, ProfileController, WorkoutsController, UsersController, AthletesController, ProfileRmsController]
})
export class ControllersModule {}
