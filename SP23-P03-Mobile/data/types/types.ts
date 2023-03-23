import { User } from "./user-types";

export type TrainStation = {
    Id: number
    Name: string
    Address: string
    ManagerId?: number
    Manager?: User
}

