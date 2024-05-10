import { OmitBy } from "@app/types";
import { UUID } from "crypto";

export interface IWorkoutDbRow {
    id: UUID;
    create_at: Date;
    update_at: Date;
    name_in_english: string;
    name_in_spanish: string | null;
    abbreviation: string | null;
    slug: string;
    rm: boolean;
    pr: boolean;
    youtube: string;
    description: string;
}

export interface IWorkoutCreate extends OmitBy<IWorkoutDbRow, 'id' | 'create_at' | 'update_at'> {}
export interface IWorkoutUpdate extends Partial<IWorkoutCreate> {}
export interface IWorkout extends IWorkoutDbRow {}