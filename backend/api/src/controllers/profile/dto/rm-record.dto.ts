import { IsNumber, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class RmRecordDto {
    @IsUUID()
    workout_id!: UUID;

    @IsNumber()
    weight_in_kilos!: number;

    @IsNumber()
    weight_in_pounds!: number;
}