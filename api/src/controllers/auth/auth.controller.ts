import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { IUser, IUserRecordRM, Sex, UserRecordRmsService, UserRole, UsersService, UserValidatorsService } from '@app/common/models/users';
import { JWTService } from '@app/common/jwt';
import { CredentialsDto, SignUpBody } from './dto';
import { isEmail } from 'class-validator';
import { compareSync } from 'bcrypt';
import { ISessionData, SessionAuthGuard, Session } from '@app/common/session';

@Controller()
export class AuthController {
    constructor(
        private readonly _users: UsersService,
        private readonly _jwt: JWTService,
        private readonly _validators: UserValidatorsService
    ){}

    @Post('sign-in')
    async name(@Body() credentials: CredentialsDto): Promise<IResponseAuth> {
        let user = await this._users.get(credentials.username);
        let token: string;
        if (!user) throw new HttpException(`Tú ${isEmail(credentials.username) ? 'correo electrónico' : 'usuario'} es incorrecto`, 400);
        if (!compareSync(credentials.password, user.password)) throw new HttpException('Tú contraseña es incorrecta', 400);
        token = this._jwt.signIn<ISessionData>({ id: user.id, role: user.role, username: user.username, permissions: user.permissions }, '1y');
        return {
            id: user.id,
            role: user.role,
            username: user.username,
            name: user.name,
            last_name: user.last_name,
            alias: user.alias,
            is_coach: user.is_coach,
            birthdate: user.birthdate,
            sex: user.sex,
            tall: user.tall,
            weight: user.weight,
            token
        }
    }

    @Post('sign-up')
    async signUp(@Body() data: SignUpBody): Promise<IResponseAuth>{
        let validation = await this._validators.emailAndUsername(data.email, data.username);
        if (!validation.email || !validation.username){
            if (validation.email == validation.email){
                throw new HttpException('El correo electrónico y el nombre de usuario ya están en uso', 400);
            } else if (validation.username){
                throw new HttpException('El nombre de usuario ya están en uso', 400);
            } else {
                throw new HttpException('El correo electrónico ya están en uso', 400);
            }
        }
        let user = await this._users.create(data);
        let token = this._jwt.signIn<ISessionData>({ id: user.id, role: user.role, username: user.username, permissions: user.permissions }, '1y');
        return {
            id: user.id,
            role: user.role,
            username: user.username,
            name: user.name,
            last_name: user.last_name,
            alias: user.alias,
            is_coach: user.is_coach,
            birthdate: user.birthdate,
            sex: user.sex,
            tall: user.tall,
            weight: user.weight,
            token
        }
    }

    @UseGuards(SessionAuthGuard)
    @Get('verify-session')
    async verifySession(@Session('data') sessionData: ISessionData ): Promise<IResponseAuth> {
        let token: string;
        let user: IUser | undefined = await this._users.get(sessionData.id);
        if (!user) throw new HttpException('Usuario no encontrado', 401);
        token = this._jwt.signIn<ISessionData>({ id: user.id, role: user.role, username: user.username, permissions: user.permissions }, '1y');
        return {
            id: user.id,
            role: user.role,
            username: user.username,
            name: user.name,
            last_name: user.last_name,
            alias: user.alias,
            is_coach: user.is_coach,
            birthdate: user.birthdate,
            sex: user.sex,
            tall: user.tall,
            weight: user.weight,
            token
        } 
    }
}

export interface IResponseAuth {
    id: string;
    role: UserRole;
    username: string;
    name: string;
    last_name: string;
    alias: string | null;
    is_coach: boolean;
    birthdate: Date;
    tall: number;
    weight: number;
    sex: Sex;
    token: string;
}
