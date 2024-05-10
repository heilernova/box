import { ConnectionDbService } from '@app/common/connection-db';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class UserValidatorsService {
    constructor(private readonly _db: ConnectionDbService){}

    async emailAndUsername(email: string, username: string, ignoreId?: UUID): Promise<{ email: boolean, username: boolean }> {
        let params = [email, username];
        let sql: string = 'select (select count(*) = 0  from users email = $1), (select count(*) = 0 from users username = $2)';
        if (ignoreId){
            sql = 'select (select count(*) = 0  from users email = $1 and id <> $3), (select count(*) = 0 from users username = $2 and id <> $3)';
            params.push(ignoreId);
        }
        const [ emailValid, usernameValid ] = (await this._db.query(sql, params, true)).rows[0];
        return {
            email: emailValid,
            username: usernameValid
        }
    }
}
