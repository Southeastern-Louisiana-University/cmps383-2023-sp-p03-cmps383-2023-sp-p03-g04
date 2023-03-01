import { Api } from './../../Config';
import axios from "axios";
import { User, GetUserResponse, CreateUserRequest } from "../Types/UserTypes";


export function getCurrentUser(): User | null {
    let result: User | null = null

    async () => {
        try {
            const {data, status} = await Api.get<GetUserResponse>('/authentication/me')

            if (status === 200) result = data.user;
        } catch (error) {
            console.error(error)
        }
    }
    return result;
}

export function createUser(user: CreateUserRequest): User | null {
    let result: User | null = null

    async () => {
        try {
            const {data, status} = await Api.post<GetUserResponse>('/users', user)

            if (status === 200) result = data.user

        } catch (error) {
            console.error(error)
            
        }
    }
    return result;
}