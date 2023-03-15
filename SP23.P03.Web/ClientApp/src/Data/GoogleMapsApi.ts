import {Client, PlaceAutocompleteRequest, PlaceAutocompleteType, PlaceDetailsRequest} from "@googlemaps/google-maps-services-js"

const API_KEY = "AIzaSyBEM-3Ls4Cgh6Z77T-yDuV6mfKcBgBHQco"
const SECRET = "usXaPPQTWL0vdpwDMnI8quBW9Ps="

export const getAddress = async (query: string) => {
    const request: PlaceAutocompleteRequest = {
        params: {
            input: query,
            key: API_KEY,
            components: ["country:us"],
            types: PlaceAutocompleteType.address,
            client_secret: SECRET,
        },
        url: `https://cors-proxy-server-ns4l4b36ea-uc.a.run.app/https://maps.googleapis.com/maps/api/place/autocomplete/json`,
    }

    const client = new Client({})

    const response = await client.placeAutocomplete(request)

    const results = response.data.predictions.map((prediction) => {
        return {
            Id: prediction.place_id,
            description: prediction.description
        }
    })

    return results;
}

export const getAddressDetails = async (placeId: string) => {
    const request: PlaceDetailsRequest = {
        params: {
            client_secret: SECRET,
            key: API_KEY,
            place_id: placeId,
        }
    }
    const client = new Client({})
    const response = await client.placeDetails(request);
    return response.data.result.formatted_address;
}