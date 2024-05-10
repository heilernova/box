import { IWorkoutCreate } from "@app/common/models/workouts/workouts.interfaces";
import { OmitBy } from "@app/types";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class WorkoutCreateDto implements OmitBy<IWorkoutCreate, 'slug'> {

    @IsString()
    @MaxLength(50)
    name_in_english!: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    name_in_spanish!: string;

    @IsString()
    @MaxLength(6)
    @IsOptional()
    abbreviation!: string | null;

    @IsBoolean()
    @IsOptional()
    rm!: boolean;

    @IsOptional()
    @IsOptional()
    pr!: boolean;

    @IsString()
    @IsOptional()
    youtube!: string;

    @IsString()
    @IsOptional()
    description!: string;
}