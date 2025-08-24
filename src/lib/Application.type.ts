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
    created_at: string
    updated_at: string
}

export enum ApplicationStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    SUSPENDED = "Suspended",
    BANNED = "Banned",
}