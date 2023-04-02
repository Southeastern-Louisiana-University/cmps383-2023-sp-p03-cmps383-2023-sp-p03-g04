import { RouteLocationItem } from './../Types/GoogleMapsTypes';
import {Client, GeocodeRequest, PlaceAutocompleteRequest, PlaceAutocompleteType, PlaceDetailsRequest} from "@googlemaps/google-maps-services-js"

const API_KEY = "AIzaSyBEM-3Ls4Cgh6Z77T-yDuV6mfKcBgBHQco"
const SECRET = "usXaPPQTWL0vdpwDMnI8quBW9Ps="
const AUTOCOMPLTE_URL = `https://cors-proxy-server-ns4l4b36ea-uc.a.run.app/https://maps.googleapis.com/maps/api/place/autocomplete/json`
export const getAddress = async (query: string) => {
    const request: PlaceAutocompleteRequest = {
        params: {
            input: query,
            key: API_KEY,
            components: ["country:us"],
            types: PlaceAutocompleteType.address,
            client_secret: SECRET,
        },
        url: AUTOCOMPLTE_URL,
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

export const getAddressCityCountry = async (query: string) => {
    const request: PlaceAutocompleteRequest = {
        params: {
            input: query,
            key: API_KEY,
            components: ["country:us"],
            types: PlaceAutocompleteType.cities,
            client_secret: SECRET,
        },
        url: AUTOCOMPLTE_URL,
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

export const getAddressGeoLocation = async (address: string) => {
    
    const request: GeocodeRequest = {
        params: {
            key: API_KEY,
            address: address,
        }
    }
    try {
        const client = new Client({})
        const response = await client.geocode(request)

        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;

        const result: RouteLocationItem = {lat, lng}
        return result;
    } catch (error) {
        console.log(error)
    }
    return {lat: 0, lng: 0} as RouteLocationItem
}