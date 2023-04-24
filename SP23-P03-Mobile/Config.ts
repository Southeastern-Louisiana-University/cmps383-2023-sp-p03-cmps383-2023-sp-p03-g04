import axios from "axios";

export const BaseUrl = axios.create(
  {
      baseURL:"https://selu383-sp23-p03-g04.azurewebsites.net/api",
      headers: {
          Accept: "application/json"
      }
  }
)

