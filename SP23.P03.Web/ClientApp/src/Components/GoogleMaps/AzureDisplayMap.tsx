import {
	AzureMap,
	AzureMapsProvider,
	IAzureMapOptions,
	AzureMapHtmlMarker,
	AzureMapDataSourceProvider,
	AzureMapFeature,
	AzureMapLayerProvider,
} from "react-azure-maps";
import { AuthenticationType, data } from "azure-maps-control";
import { useEffect, useState, useMemo } from "react";
import { getRoute } from "../../Data/AzureMaps/AzureMapApi";
import { getCookie } from "../../Data/Cookies/CookieData";
import { calculateMidPoint } from "../../GridFunctions/MidPoint";

const SUBSCRIPTION_KEY = "ZVZ6ckjfrJ1RV0jZFJPAyVEZ-Rwo_wuxWulgh2cAyOQ";

export const AzureMapDisplay = () => {
	const points = useMemo(
		() => [
			[getCookie("from-lat"), getCookie("from-lon")],
			[getCookie("to-lat"), getCookie("to-lon")],
		],
		[]
	);

	const point1 = points[1] as string[];
	const point2 = points[0] as string[];

	const midpoint = () => {
		return calculateMidPoint(point1, point2);
	};
	const [routeCoordinates, setRouteCoordinates] = useState([]);

	useEffect(() => {
		(async () => {
			const route = await getRoute(points[1], points[0]);
			setRouteCoordinates(route as []);
		})();
	}, [points]);
	const option: IAzureMapOptions = {
		authOptions: {
			authType: AuthenticationType.subscriptionKey,
			subscriptionKey: SUBSCRIPTION_KEY,
		},
		center: midpoint(),
		zoom: 5,
		view: "Auto",
	};
	const firstPos = new data.Position(
		parseFloat(points[0].at(0) as string),
		parseFloat(points[0].at(1) as string)
	);
	const secondPos = new data.Position(
		parseFloat(points[1].at(0) as string),
		parseFloat(points[1].at(1) as string)
	);
	return (
		<div style={{ width: "75%", height: "400px" }}>
			<AzureMapsProvider>
				<AzureMap options={option}>
					<AzureMapDataSourceProvider
						id={"routeDataSource AzureMapDataSourceProvider"}
						options={{
							lineMetrics: true,
						}}
					>
						<AzureMapLayerProvider
							id="routeLayer"
							options={{
								strokeWidth: 8,
								strokeColor: "red",
							}}
							type={"LineLayer"}
						/>
						<AzureMapHtmlMarker
							key={`marker-${firstPos.toString()}`}
							options={{ position: firstPos }}
						/>
						<AzureMapHtmlMarker
							key={`marker-${secondPos.toString()}`}
							options={{ position: secondPos }}
						/>
						<AzureMapFeature
							key={"Line String Feature"}
							id={"Line Strign ID"}
							type={"LineString"}
							coordinates={routeCoordinates}
						/>
					</AzureMapDataSourceProvider>
				</AzureMap>
			</AzureMapsProvider>
		</div>
	);
};
