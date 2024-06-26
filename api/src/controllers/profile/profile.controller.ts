import { IUser, UserRecordRmsService, UserRecordWeightService, UsersService, UserValidatorsService } from '@app/common/models/users';
import { ISessionData, Session, SessionAuthGuard } from '@app/common/session';
import { Body, Controller, Get, HttpException, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileUpdateDto, RmRecordDto, UpdatePasswordDto } from './dto';
import { compareSync } from 'bcrypt';

@UseGuards(SessionAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly _users: UsersService,
        private readonly _validators: UserValidatorsService,
        private readonly _rms: UserRecordRmsService,
        private readonly _weight: UserRecordWeightService
    ){}

    @Get()
    async getInfo(@Session('data') data: ISessionData){
        let user: IUser | undefined = await this._users.get(data.id);
        if (!user) throw new HttpException('Usuario no encontrado', 400);
        return {
            name: user.name,
            last_name: user.last_name,
            alias: user.alias,
            is_coach: user.is_coach,
            birthdate: user.birthdate,
            sex: user.sex,
            tall: user.tall,
            weight: user.weight,
            username: user.username,
            email: user.email,
            cellphone: user.cellphone
        }
    }

    @Put()
    async update(@Session('data') sessionData: ISessionData, @Body() data: ProfileUpdateDto): Promise<void> {
        let user: IUser | undefined = await this._users.get(sessionData.id);
        if (!user) throw new HttpException('Usuario no encontrado', 400);

        if (data.email || data.username){
            let validation = await this._validators.emailAndUsername(data.username ?? user.username, data.email ?? user.email, sessionData.id);
            if (!validation.email || !validation.username){
                if (validation.email == validation.email){
                    throw new HttpException('El correo electrónico y el nombre de usuario ya están en uso', 400);
                } else if (validation.username){
                    throw new HttpException('El nombre de usuario ya están en uso', 400);
                } else {
                    throw new HttpException('El correo electrónico ya están en uso', 400);
                }
            }
        }
        await this._users.update(sessionData.id, data);
    }

    @Patch('password')
    async changePassword(@Session('data') sessionData: ISessionData, @Body() data: UpdatePasswordDto): Promise<void> {
        let user: IUser | undefined = await this._users.get(sessionData.id);
        if (!user) throw new HttpException('Usuario no encontrado', 400);
        if (!compareSync(data.password, user.password)) throw new HttpException('Tú contraseña es incorrecta', 400);
        this._users.update(user.id, { password: data.new_password });
        return;
    }

    @Get('rms')
    async getRMS(@Session('data') sessionData: ISessionData){
        return (await this._rms.get(sessionData.id)).map(x => {
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

    @Post('rms')
    async recordRM(@Session('data') sessionData: ISessionData, @Body() data: RmRecordDto){
        let user: IUser | undefined = await this._users.get(sessionData.id);
        if (!user) throw new HttpException('Usuario no encontrado', 400);
        let result = await this._rms.register({ user_id: sessionData.id, ...data });
        return {
            id: result.id,
            create_at: result.create_at,
            weight_in_kilos: data.weight_in_kilos,
            weight_in_pounds: data.weight_in_pounds
        }
    }

    @Get('records/weight')
    async recordsWeight(@Session('data') data: ISessionData){
        return this._weight.getRecords(data.id);
    }
}
