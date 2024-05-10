import { UUID } from "crypto";
import { UserRole } from "../models/users";

export interface ISessionData {
    id: UUID;
    username: string;
    role: UserRole;
    permissions: string[]
}