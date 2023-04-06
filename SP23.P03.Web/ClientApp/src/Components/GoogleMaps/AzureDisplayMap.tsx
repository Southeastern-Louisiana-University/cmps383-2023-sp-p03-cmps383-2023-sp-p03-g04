import {AzureMap, AzureMapsProvider, IAzureMapOptions} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'

const SUBSCRIPTION_KEY = "ZVZ6ckjfrJ1RV0jZFJPAyVEZ-Rwo_wuxWulgh2cAyOQ"

export const AzureMapDisplay = () => {
    const option: IAzureMapOptions = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: SUBSCRIPTION_KEY
        },
    }

    return (
        <div style={{ width: "75%", height: "400px" }}>
            <AzureMapsProvider>
                <AzureMap options={option}>

                </AzureMap>
            </AzureMapsProvider>
        </div>
    )
}