import axios from "axios";

export const Api = axios.create(
    {
        baseURL: "/api",
        headers: {
            Accept: "application/json"
        }
    }
)