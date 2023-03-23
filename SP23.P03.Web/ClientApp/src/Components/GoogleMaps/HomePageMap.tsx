import { useEffect, useRef, useState } from "react";
import "./MapStyles.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export const HomePageMap = () => {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [error, setError] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
			},
			(error) => {
				setError(error.message);
				console.log(error);
			}
		);
	}, []);
	const center = { lat: latitude, lng: longitude };

	return (
		<LoadScript googleMapsApiKey="AIzaSyBEM-3Ls4Cgh6Z77T-yDuV6mfKcBgBHQco">
			<GoogleMap
				center={center}
				zoom={5}
				mapContainerStyle={{ width: "75%", height: "400px" }}
			/>
		</LoadScript>
	);
};
