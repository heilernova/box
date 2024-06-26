import { IUserCreate, UserRole, UserState } from "@app/common/models/users";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsNumber, IsOptional, IsPhoneNumber, IsPort, IsString, MaxLength } from "class-validator";

export class SignUpBody implements IUserCreate {
    status?: UserState | undefined;
    role?: UserRole | undefined;
    is_coach?: boolean | undefined;
    permissions?: string[] | undefined;
    @IsIn(['CO'])
    country!: string;
    
    @IsString()
    @MaxLength(20)
    name!: string;
    
    @IsString()
    @MaxLength(20)
    last_name!: string;

    @IsString()
    @MaxLength(30)
    @IsOptional()
    alias?: string | null;

    @IsIn(['M', 'F'])
    sex!: "M" | "F";

    @Transform(x => new Date(x.value))
    @IsDate()
    birthdate!: Date;

    @IsNumber()
    tall!: number;

    @IsNumber()
    weight!: number;

    @IsString()
    @MaxLength(20)
    username!: string;

    @IsEmail()
    email!: string;

    @IsPhoneNumber()
    cellphone!: string;

    @IsString()
    password!: string;   
}