import { Sex } from "@app/common/models/users";
import { UUID } from "crypto";

export interface IServerUser {
    id: UUID;
    status: string;
    role: string;
    avatar: string | null;
    email: string;
    username: string;
    name: string;
    last_name: string;
    sex: Sex;
    tall_in_centimeters: string;
    weight_in_kilos: string;
    birthdate: Date;
    cellphone: string;
    password: string
}

export interface IServerWorkout {
    id: UUID;
    create_at: Date;
    update_at: Date;
    name_in_english: string;
    name_in_spanish: string | null;
    abbreviation: string | null;
    description: string | null;
    slug: string;
    youtube: string | null;
    measure_rm: boolean;
    measure_or: boolean;
}
export interface IServerRM {
    id: UUID;
    create_at: Date;
    user_id: UUID;
    workout_id: UUID;
    weight_in_kilos: number
}