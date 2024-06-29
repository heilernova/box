import { Global, Module } from '@nestjs/common';
import { WorkoutLogService } from './workouts/workout-log/workout-log.service';

const service = [
  WorkoutLogService
];

@Global()
@Module({
  providers: service,
  exports: service
})
export class ModelsModule {}
