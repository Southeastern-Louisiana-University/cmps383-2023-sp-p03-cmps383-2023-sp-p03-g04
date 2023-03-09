import axios from "axios";

export const Api = axios.create(
    {
        baseURL: "https://localhost:7031/api",
        headers: {
            Accept: "application/json"
        }
    }
)