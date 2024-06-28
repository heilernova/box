import { ConnectionDbService } from '@app/common/connection-db';
import { Controller, Get } from '@nestjs/common';

@Controller('locations/countries')
export class LocationsCountriesController {
    constructor(private readonly _db: ConnectionDbService){}

    @Get()
    async getAll(){
        return (await this._db.query('select * from countries')).rows.map(country => {
            return {
                code: country.code_alfa_2,
                name: country.name
            }
        })
    }
}
