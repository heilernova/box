import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RMRecordDto } from './dto/rm-record.dto';
import { ISessionData, Session, SessionAuthGuard } from '@app/common/session';
import { UserRecordRmsService } from '@app/common/models/users';

@UseGuards(SessionAuthGuard)
@Controller('profile/rms')
export class ProfileRmsController {
    constructor(
        private readonly _rms: UserRecordRmsService,
    ){}

    @Get()
    async getAll(@Session('data') sessionData: ISessionData){
        let rms  = await this._rms.get(sessionData.id);
        return rms.map(x => {
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

    @Post()
    async registre(@Session('data') sessionData: ISessionData,  @Body() body: RMRecordDto){
        let weightInKilos: number;
        let weightInPounds: number;

        if (body.unit == 'kilos'){
            weightInKilos = body.weight;
            weightInPounds = Math.round(body.weight * 2.20462);
        } else {
            weightInPounds = body.weight;
            weightInKilos = Math.round(body.weight / 2.20462);
        }

        let result = await this._rms.register({
            user_id: sessionData.id,
            workout_id: body.workout_id,
            weight_in_kilos: weightInKilos,
            weight_in_pounds: weightInPounds
        });

        return result;
    }
}
