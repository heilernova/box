import { UserRecordRmsService, UsersService } from '@app/common/models/users';
import { Controller, Get, HttpException, Param } from '@nestjs/common';

@Controller('athletes')
export class AthletesController {
    constructor(
        private readonly _users: UsersService,
        private readonly _rms: UserRecordRmsService
    ){}

    @Get()
    async getAll(){
        const list = await this._users.getAll();
        return list.map(x => {
            return {
                username: x.username,
                name: x.name,
                last_name: x.last_name,
                alias: x.alias,
                sex: x.sex,
                is_coach: x.is_coach,
                tall: x.tall,
                weight: x.weight,
                country: x.country,
                category: x.category,
                birthdate: x.birthdate,
                verified: x.verified
            };
        });
    }

    @Get(':id/rms')
    async getRMs(@Param('id') id: string){
        let user = await this._users.get(id);
        if (!user) throw new HttpException('Atleta no encontrado', 404);
        return (await this._rms.get(user.id)).map(x => {
            return {
                id: x.workout_id,
                name_in_english: x.name_in_english,
                name_in_spanish: x.name_in_spanish,
                abbreviation: x.abbreviation,
                slug: x.slug,
                record: x.record_id ? {
                    id: x.record_id,
                    create_at: x.create_at,
                    weight_in_kilos: x.weight_in_kilos,
                    weight_in_pounds: x.weight_in_pounds
                } : null    
            }
        });
    }
}
