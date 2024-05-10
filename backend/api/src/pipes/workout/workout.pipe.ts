import { WorkoutsService } from '@app/common/models/workouts';
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class WorkoutPipe implements PipeTransform {
  constructor(private readonly _workouts: WorkoutsService){}
  async transform(value: any, metadata: ArgumentMetadata) {
    let workout = await this._workouts.get(value);
    if (!workout) throw new HttpException('Ejercicio no encontrado', 404);
    return workout;
  }
}
