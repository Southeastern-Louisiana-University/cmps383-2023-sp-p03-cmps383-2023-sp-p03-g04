import axios from 'axios';
import * as atlas from 'azure-maps-control';

const SUBSCRIPTION_KEY = "ZVZ6ckjfrJ1RV0jZFJPAyVEZ-Rwo_wuxWulgh2cAyOQ"

export async function getAzureAddress(address: string) {
    const url = `https://atlas.microsoft.com/search/fuzzy/json?subscription-key=${SUBSCRIPTION_KEY}&limit=6&api-version=1.0&typeahead=true&countrySet=US&query=${address}`;
    try {
        const {data} = await axios.get(url);

        const arr = data.results.map((point) => {
            return point.address.freeformAddress
        })

        //return data.results[0].address.freeformAddress
        return arr;
    } catch (error) {
       return; 
    }
}