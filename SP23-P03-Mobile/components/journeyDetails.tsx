import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Button,} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

interface JourneyDetailsProps {
  navigation: any;
}

interface Location {
  latitude: number;
  longitude: number;
}

const JourneyDetails: React.FC<JourneyDetailsProps> = ({ navigation }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      console.log('Geolocation is not supported by this device');
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleNext = () => {
    navigation.navigate("SeatSelection", {
      source,
      destination,
      date,
      ticketType,
      userLocation,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && <Marker coordinate={{latitude: userLocation.latitude, longitude:userLocation.longitude}} />}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Ticket Type"
        value={ticketType}
        onChangeText={setTicketType}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

export default JourneyDetails;
