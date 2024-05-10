import { Global, Module } from '@nestjs/common';
import { ConnectionDbService } from './connection-db';
import { JWTService } from './jwt';
import { UsersService } from './models/users/users/users.service';
import { UserValidatorsService } from './models/users/user-validators/user-validators.service';
import { UserRecordWeightService } from './models/users/user-record-weight/user-record-weight.service';
import { UserRecordRmsService } from './models/users/user-record-rms/user-record-rms.service';

const services = [
    ConnectionDbService,
    JWTService,

    // User services
    UsersService,
    UserValidatorsService,
    UserRecordWeightService,
    UserRecordRmsService
];

@Global()
@Module({
    providers: services,
    exports: services
})
export class CommonModule {}
