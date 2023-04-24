import React, { useState, useEffect } from "react";
import { View, StyleSheet,} from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons';
import { DatePickerModal } from 'react-native-paper-dates';

interface JourneyDetailsProps {
  navigation: any;
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
      <TextInput
        style={styles.input}
        variant="outlined"
        label="From"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={styles.input}
        variant="outlined"
        label="To"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        variant="outlined"
        label="Date"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        variant="outlined"
        label="Ticket Type"
        value={ticketType}
        onChangeText={setTicketType}
      />
      <Button 
      title="Next"
      onPress={handleNext}
      trailing={props => <MaterialIcons name = "navigate-next" {...props} />}
      />
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
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

export default JourneyDetails;
