import { Api } from './../../Config';
import { Train } from "../Types/TrainTypes";


export async function getAllTrains() {
    try {
        const {data, status} = await Api.get<Array<Train>>("/trains")

        if (status === 200) {
            return data;
        } else {
            throw Error;
        }
    } catch (error) {
        return;
    }
}

export async function getTrainById(id: number) {
    try {
        const {data, status} = await Api.get<Train>(`/trains/${id}`)

        if (status === 200) {
            return data;
        } else {
            throw Error;
        }
    } catch (error) {
        return;
    }
}