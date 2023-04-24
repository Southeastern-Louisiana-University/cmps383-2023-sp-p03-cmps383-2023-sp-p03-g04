import { BaseUrl } from '../../Config';
import { CreateUserRequest, GetUserResponse, User } from '../types/user-types';



export function getCurrentUser(): User | null {
    let result: User | null = null

    async () => {
        try {
            const {data, status} = await BaseUrl.get<GetUserResponse>('/authentication/me')

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
            const {data, status} = await BaseUrl.post<GetUserResponse>('/users', user)

            if (status === 200) result = data.user

        } catch (error) {
            console.error(error)
            
        }
    }
    return result;
}