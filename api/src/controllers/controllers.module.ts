import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [AuthController, ProfileController, WorkoutsController, UsersController]
})
export class ControllersModule {}
