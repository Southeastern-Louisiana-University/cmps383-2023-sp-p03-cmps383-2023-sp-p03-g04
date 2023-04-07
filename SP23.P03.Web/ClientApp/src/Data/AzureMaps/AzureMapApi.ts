import axios from 'axios';
import * as turf from "@turf/turf";

const SUBSCRIPTION_KEY = "ZVZ6ckjfrJ1RV0jZFJPAyVEZ-Rwo_wuxWulgh2cAyOQ"

export async function getAzureAddress(address: string) {
    const url = `https://atlas.microsoft.com/search/address/json?subscription-key=${SUBSCRIPTION_KEY}&limit=6&api-version=1.0&typeahead=true&countrySet=US&query=${address}`;
    try {
        const {data} = await axios.get(url);
        const arr = data.results.map((point) => {
            return point.address.freeformAddress
        })

        return arr;
    } catch (error) {
       return []; 
    }
}

export async function getCity(city: string) {
    const url = `https://atlas.microsoft.com/search/address/json?subscription-key=${SUBSCRIPTION_KEY}&categorySet=PopulatedPlace&limit=6&api-version=1.0&typeahead=true&countrySet=US&query=${city}`;
    if (city !== null && city !== undefined && city.length > 0) {
        try {
            const {data} = await axios.get(url);
            const set = new Set();
            data.results
            .filter((point: any) => point.type === "Geography")
            .filter((point: any) => point.entityType === "Municipality")
            .forEach((point: any) => {  set.add(point)});
            return Array.from(set);
        } catch (error) {
            return []; 
        }
    } else {
        return []
    }
}

export async function reverseLocate(coords: string) {
    const url = `https://atlas.microsoft.com/search/address/reverse/json?subscription-key=${SUBSCRIPTION_KEY}&entityType=Municipality&api-version=1.0&typeahead=true&countrySet=US&query=${coords}&number=1`;
    try {
        const {data} = await axios.get(url);
        return data.addresses.at(0).address.freeformAddress;
    } catch (error) {
       return []; 
    }

}

export async function getRoute(from, to){
    try {
      const response = await axios.get(
        `https://atlas.microsoft.com/route/directions/json?api-version=1.0&subscription-key=${SUBSCRIPTION_KEY}&query=${from[1]},${from[0]}:${to[1]},${to[0]}&routeType=fastest`
      );
      const coordinates = response.data.routes[0].legs[0].points.map((point) => [point.longitude, point.latitude]);
      const line = turf.lineString(coordinates);
      const simplifiedLine = turf.simplify(line, { tolerance: 0.001, highQuality: false });
      return simplifiedLine.geometry.coordinates.map(coord => [coord[0], coord[1]]);
    } catch (error) { 
      console.error('Error fetching route:', error);
      return [];
    }
  };