import { IUser, UsersService } from '@app/common/models/users';
import { Permission, RequirePermissions, SessionAuthGuard } from '@app/common/session';
import { UserPipe } from '@app/pipes';
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';

@UseGuards(SessionAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly _users: UsersService){}

    @Post()
    @RequirePermissions(Permission.USERS_CREATE)
    async create(){
        
    }

    @Get(':user')
    @RequirePermissions(Permission.USERS_READ)
    async get(@Param('user', UserPipe) user: IUser){
        return user;
    }
    
    @Get()
    @RequirePermissions(Permission.USERS_READ)
    async getAll(){
        
    }
    
    @Patch()
    @RequirePermissions(Permission.USERS_UPDATE)
    async update(){
        
    }

    @Patch(':user')
    @RequirePermissions(Permission.USERS_UPDATE)
    async resetPassword(@Param('user', UserPipe) user: IUser, @Body('password') password: string){
        if (typeof password == 'string'){
            return await this._users.update(user.id, { password });
        }
        throw new HttpException('Ingrese una contraseña', 400);
    }
    
    @Delete()
    @RequirePermissions(Permission.USERS_DELETE)
    async delete(){

    }
}
