import { UUID } from "crypto";

export interface ISessionData {
    id: UUID;
    username: string;
    role: string;
    permissions: string[]
}