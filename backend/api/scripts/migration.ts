import { Pool } from "pg";
import { IServerRM, IServerUser, IServerWorkout } from "./interfaces";
import { IUserDbRow } from "@app/common/models/users";
import { hashSync } from "bcrypt";

const poolServer = new Pool({ host: 'server.novaccode.com', user: 'user_admin', password: 'novaccode1007244088', database: 'atlog' });

let pw = hashSync('kanuth', 10);
const main = async () => {
    let userList: { [key: string]: string }[] = (await poolServer.query<IServerUser>('select * from users')).rows.map(x => {
        return {
            id: `'${x.id}'`,
            create_at: `'${new Date().toISOString()}'`,
            update_at:`'${new Date().toISOString()}'`,
            status: "'enable'",
            role: "'user'",
            is_coach: 'FALSE',
            username: `'${x.username}'`,
            name: `'${x.name}'`,
            last_name: `'${x.last_name}'`,
            sex: `'${x.sex}'`,
            email: `'${x.email}'`,
            birthdate: `'${x.birthdate.toISOString()}'`,
            cellphone: `'${x.cellphone}'`,
            tall: x.tall_in_centimeters,
            weight: x.weight_in_kilos,
            country: "'CO'",
            password: `'${pw}'`,
            permissions: 'default'
        }
    });

    let workouts = (await poolServer.query<IServerWorkout>('select * from workouts')).rows.map(x => {
        return [
            `'${x.id}'`,
            'default',
            'default',
            `'${x.name_in_english}'`,
            `'${x.name_in_spanish}'`,
            `'${x.abbreviation}'`,
            `'${x.slug}'`,
            `default`,
            'default',
            'default',
            'default'
        ]
    });
    let rms = (await poolServer.query<IServerRM>('select * from users_records_rm')).rows.map(x => {
        return '(' + ['default', `'${x.create_at.toISOString()}'`, `'${x.user_id}'`, `'${x.workout_id}'`, x.weight_in_kilos, Math.round(x.weight_in_kilos * 2.20462)].join(', ') + ')'
    });

    let sql: string = '';

    sql = "insert into users values\n";
    sql = sql + userList.map(x => {
        return "(" + Object.values(x).join(', ') + ")";
    }).join(",\n");

    sql = sql + ";\n\n";

    sql += "insert into workouts values\n";
    sql += workouts.map(x => `(${x.join(', ')})`).join(",\n");

    sql += ";\n\n";

    sql += "insert into users_records_rm values\n";
    sql += rms.join(",\n");
    console.log(sql);
}

main();