import { UsersService } from '@app/common/models/users';
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private readonly _users: UsersService){}
  async transform(value: any, metadata: ArgumentMetadata) {
    let user = await this._users.get(value);
    if (!user) throw new HttpException('Usuario no encontrado', 404);
    return user;
  }
}
