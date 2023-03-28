import { useEffect, useRef, useState } from "react";
import "./MapStyles.css";
import {
	DirectionsRenderer,
	DirectionsService,
	GoogleMap,
	InfoWindow,
	LoadScript,
	Marker,
} from "@react-google-maps/api";
import {
	RouteLocationItem,
	RouteLocations,
} from "../../Data/Types/GoogleMapsTypes";
import { getAddressGeoLocation } from "../../Data/GoogleMaps/PlacesApi";

export const HomePageMap = () => {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [route, setRoute] = useState<any>(null as any);
	const [error, setError] = useState("");
	const [selectedMarker, setSelectedMarker] = useState(null);

	const [firstLocation, setFirstLocation] = useState<RouteLocationItem>({
		lat: 0,
		lng: 0,
	});
	const [secondLocation, setSecondLocation] = useState<RouteLocationItem>({
		lat: 0,
		lng: 0,
	});
	const handleMarkerClick = (marker) => {
		setSelectedMarker(marker);
	};

	const handleInfoWindowClose = () => {
		setSelectedMarker(null);
	};

	useEffect(() => {
		const setLocations = async () => {
			const first = await getAddressGeoLocation(
				sessionStorage.getItem("from-city")!
			);
			const second = await getAddressGeoLocation(
				sessionStorage.getItem("to-city")!
			);

			setFirstLocation(first);
			setSecondLocation(second);
		};

		setLocations();
	}, []);

	return (
		// <LoadScript
		// 	googleMapsApiKey="AIzaSyBEM-3Ls4Cgh6Z77T-yDuV6mfKcBgBHQco"
		// 	onLoad={() => console.log("Google Maps API loaded")}
		// >
		<GoogleMap
			center={firstLocation}
			zoom={6}
			mapContainerStyle={{ width: "75%", height: "400px" }}
			options={{}}
		>
			<Marker
				position={{
					lat: firstLocation.lat,
					lng: firstLocation.lng,
				}}
				clickable
				onClick={() => handleMarkerClick("start")}
			/>
			<Marker
				position={{
					lat: secondLocation.lat,
					lng: secondLocation.lng,
				}}
				onClick={() => handleMarkerClick("destination")}
			/>

			<DirectionsService
				options={{
					origin: firstLocation,
					destination: secondLocation,
					travelMode: google.maps.TravelMode.DRIVING,
				}}
				callback={(result) => {
					if (result !== null) {
						setRoute(result);
					}
				}}
			/>
			{route && (
				<DirectionsRenderer
					options={{
						directions: route,
						draggable: true,
						preserveViewport: true,
						polylineOptions: {
							strokeColor: "red",
						},
						suppressMarkers: true,
					}}
				/>
			)}
			{selectedMarker && (
				<InfoWindow
					position={{
						lat:
							selectedMarker === "start"
								? firstLocation.lat
								: secondLocation.lat,
						lng:
							selectedMarker === "start"
								? firstLocation.lng
								: secondLocation.lng,
					}}
					onCloseClick={handleInfoWindowClose}
				>
					<div>
						{selectedMarker === "start"
							? `${sessionStorage.getItem("from-city")}`
							: `${sessionStorage.getItem("to-city")}`}
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
		// </LoadScript>
	);
};
