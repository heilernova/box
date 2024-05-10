import { Global, Module } from '@nestjs/common';
import { ConnectionDbService } from './connection-db';
import { JWTService } from './jwt';

const services = [
    ConnectionDbService,
    JWTService
];

@Global()
@Module({
    providers: services,
    exports: services
})
export class CommonModule {}
