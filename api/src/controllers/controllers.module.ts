import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { UsersController } from './users/users.controller';
import { AthletesController } from './athletes/athletes.controller';
import { ProfileRmsController } from './profile-rms/profile-rms.controller';
import { LocationsCountriesController } from './locations-countries/locations-countries.controller';

@Module({
  controllers: [AuthController, ProfileController, WorkoutsController, UsersController, AthletesController, ProfileRmsController, LocationsCountriesController]
})
export class ControllersModule {}
