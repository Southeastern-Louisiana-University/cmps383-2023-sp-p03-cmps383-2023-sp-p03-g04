
export type TrainCarType = {
    id: number
    type: string
}

export type TrainCar = {
    id: number
    trainCarTypeId: number
    trainId: number
    capacity: number
}