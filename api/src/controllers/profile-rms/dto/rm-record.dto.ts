import { IsIn, IsNumber, IsOptional, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class RMRecordDto {
    @IsUUID()
    workout_id!: UUID;

    @IsIn(['kilos', 'pounds'])
    @IsOptional()
    unit!: 'kilos' | 'pounds';

    @IsNumber()
    weight!: number;
}