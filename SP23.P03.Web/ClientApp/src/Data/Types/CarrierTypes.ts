import { Train } from "./TrainTypes";

export type Carrier = {
    id: number
    name: string;
    trains: Array<Train>
}