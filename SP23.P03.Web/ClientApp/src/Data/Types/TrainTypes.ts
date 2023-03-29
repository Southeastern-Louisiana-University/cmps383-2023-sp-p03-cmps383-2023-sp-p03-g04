import { TrainCar } from "./TrainCarTypes";

export type Train = {
    id: number
    carrierId: number
    trainCars: Array<TrainCar>
}