import {
	AzureMap,
	AzureMapsProvider,
	IAzureMapOptions,
	AzureMapHtmlMarker,
} from "react-azure-maps";
import { AuthenticationType } from "azure-maps-control";

const SUBSCRIPTION_KEY = "ZVZ6ckjfrJ1RV0jZFJPAyVEZ-Rwo_wuxWulgh2cAyOQ";

export const AzureMapDisplay = () => {
	const points = [
		[
			sessionStorage.getItem("from-lat"),
			sessionStorage.getItem("from-lon"),
		],
		[sessionStorage.getItem("to-lat"), sessionStorage.getItem("to-lon")],
	];
	console.log(points);

	const option: IAzureMapOptions = {
		authOptions: {
			authType: AuthenticationType.subscriptionKey,
			subscriptionKey: SUBSCRIPTION_KEY,
		},
	};

	return (
		<div style={{ width: "75%", height: "400px" }}>
			<AzureMapsProvider>
				<AzureMap options={option}>
					<AzureMapHtmlMarker options={{}}></AzureMapHtmlMarker>
				</AzureMap>
			</AzureMapsProvider>
		</div>
	);
};
