export type Application = {
    id: string
    name: string
    description: string
    website: string
    status: ApplicationStatus
    created_at: string
    updated_at: string
    author: User

    client_id: string
    client_secret: string
    callback_url: string
    scopes: string[]
}
export type User = {
    image: string
    id: string
    name: string
    email: string
    role: UserRole
    status: UserStatus
    created_at: string
    updated_at: string
    last_login?: string
}

export enum ApplicationStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    SUSPENDED = "Suspended",
    BANNED = "Banned",
}

export enum UserStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    SUSPENDED = "Suspended",
    BANNED = "Banned",
}

export enum UserRole {
    ADMIN = "Admin",
    USER = "User",
    MODERATOR = "Moderator",
    DEVELOPER = "Developer",
}