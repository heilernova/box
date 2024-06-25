import { Sex } from "@app/common/models/users";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsNumber, IsOptional, IsPhoneNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class ProfileUpdateDto {
    @IsString()
    @MaxLength(20)
    @IsOptional()
    username!: string;
    
    @IsEmail()
    @MaxLength(100)
    @IsOptional()
    email!: string;
    
    @IsString()
    @MaxLength(20)
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    last_name!: string;

    @IsIn(['M', 'F'])
    @IsOptional()
    sex!: Sex;

    @Transform(x => new Date(x.value))
    @IsDate()
    @IsOptional()
    birthdate?: Date;

    @IsPhoneNumber()
    @IsOptional()
    cellphone!: string;
    
    @IsNumber()
    @Min(1)
    @Max(250)
    @IsOptional()
    tall!: number;

    @IsNumber()
    @Min(1)
    @Max(200)
    @IsOptional()
    weight!: number;

    @IsIn(['CO'])
    @IsOptional()
    country!: string;
}