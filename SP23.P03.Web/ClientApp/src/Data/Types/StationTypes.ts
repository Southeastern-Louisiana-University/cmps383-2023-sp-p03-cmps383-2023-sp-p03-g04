export type TrainStation = {
    id: number,
    name: string,
    address: string,
    managerId?: number
}

export type CreateTrainStationRequest = {
    name: string,
    address: string,
    managerId?: string
}