import { IUser, UserRecordRmsService, UserRecordWeightService, UsersService, UserValidatorsService } from '@app/common/models/users';
import { ISessionData, Session, SessionAuthGuard } from '@app/common/session';
import { Body, Controller, Get, HttpException, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileUpdateDto, UpdatePasswordDto } from './dto';
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
            country: user.country,
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

    @Get('records/weight')
    async recordsWeight(@Session('data') data: ISessionData){
        return this._weight.getRecords(data.id);
    }
}
