export type User = {
    Id: number
    Username: string
    Roles: string[]
}

export type LoginUserRequest = {
    Username: string
    Password: string
}

export type GetUserResponse = {
    user: User;
}

export type CreateUserRequest = {
    Username: string
    Password: string
    Roles: string[]
}