import { Global, Module } from '@nestjs/common';
import { WorkoutLogService } from './workouts/workout-log/workout-log.service';

@Global()
@Module({
  providers: [WorkoutLogService]
})
export class ModelsModule {}
