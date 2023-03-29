import { User } from "./UserTypes"

export type TrainStation = {
    id: number,
    name: string,
    address: string,
    managerId?: number,
    manager?: User
}

export type CreateTrainStationRequest = {
    name: string,
    address: string,
    managerId?: string
}