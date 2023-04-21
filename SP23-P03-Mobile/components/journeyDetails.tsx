import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet,} from "react-native";
import { Input, Button } from "native-base";
import {COLORS, ROUTES} from '../constants';
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


  const handleNext = () => {
    navigation.navigate("SeatSelection", {
      source,
      destination,
      date,
      ticketType,
    });
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="From"
        value={source}
        onChangeText={setSource}
      />
      <Input
        style={styles.input}
        placeholder="To"
        value={destination}
        onChangeText={setDestination}
      />
      <Input
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Input
        style={styles.input}
        placeholder="Ticket Type"
        value={ticketType}
        onChangeText={setTicketType}
      />
      <Button
       style={styles.button}
       size={"lg"} onPress={handleNext}
       color={"primary"}>
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 1,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#0000",
    borderRadius: 4,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button:{
    marginTop: 30,
    width: "50%",
    backgroundColor: COLORS.primary
  }
});

export default JourneyDetails;
