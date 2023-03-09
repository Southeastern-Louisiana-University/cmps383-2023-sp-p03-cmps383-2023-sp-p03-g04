import { User } from "./UserTypes"

export type TrainStation = {
    Id: number
    Name: string
    Address: string
    ManagerId?: number
    Manager?: User
}