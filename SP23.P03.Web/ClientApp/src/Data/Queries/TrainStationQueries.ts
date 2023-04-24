import { Api } from "../../Config";
import { TrainStation } from "../Types/StationTypes";

export async function getAllTrainStations() {
    try {
        const {data, status} = await Api.get<TrainStation>("/stations");

        if (status !== 200) {
            return data;
        } else {
            throw Error;
        }
    } catch (error) {
        return;
    }
}

export async function getTrainStationById(id: number) {
    try {
        const {data, status} = await Api.get<TrainStation>(`/stations/${id}`);

        if (status !== 200) {
            return data;
        } else {
            throw Error;
        }
    } catch (error) {
        return;
    }
}