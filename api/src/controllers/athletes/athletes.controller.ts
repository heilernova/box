import { UsersService } from '@app/common/models/users';
import { Controller, Get } from '@nestjs/common';

@Controller('athletes')
export class AthletesController {
    constructor(
        private readonly _users: UsersService
    ){}

    @Get()
    async getAll(){
        const list = await this._users.getAll();
        return list.map(x => {
            return {
                username: x.username,
                name: x.name,
                last_name: x.last_name,
                sex: x.sex,
                is_coach: x.is_coach,
                tall: x.tall,
                weight: x.weight,
                country: x.country,
                birthdate: x.birthdate
            };
        });
    }
}
