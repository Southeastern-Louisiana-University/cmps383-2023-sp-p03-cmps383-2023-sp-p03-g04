import axios from 'axios';

const SUBSCRIPTION_KEY = "ZVZ6ckjfrJ1RV0jZFJPAyVEZ-Rwo_wuxWulgh2cAyOQ"

export async function getAzureAddress(address: string) {
    const url = `https://atlas.microsoft.com/search/address/json?subscription-key=${SUBSCRIPTION_KEY}&limit=6&api-version=1.0&typeahead=true&countrySet=US&query=${address}`;
    try {
        const {data} = await axios.get(url);
        console.log(data.results);
        const arr = data.results.map((point) => {
            return point.address.freeformAddress
        })

        return arr;
    } catch (error) {
       return []; 
    }
}