import { SetMetadata } from "@nestjs/common";

export enum Permission {
    USERS_CREATE = 'USERS_CREATE',
    USERS_READ = 'USERS_READ',
    USERS_UPDATE = 'USERS_UPDATE',
    USERS_DELETE = 'USERS_DELETE',

    WORKOUT_CREATE = 'WORKOUT_CREATE',
    WORKOUT_READ = 'WORKOUT_READ',
    WORKOUT_UPDATE = 'WORKOUT_UPDATE',
    WORKOUT_DELETE = 'WORKOUT_DELETE',

    GYMS_CREATE = 'GYMS_CREATE',
    GYMS_READ = 'GYMS_READ',
    GYMS_UPDATE = 'GYMS_UPDATE',
    GYMS_DELETE = 'GYMS_DELETE',
}

export const PERMISSION_KEY = 'appPermits';
export const RequirePermissions = (...roles: Permission[]) => {
    return SetMetadata(PERMISSION_KEY, roles);
}