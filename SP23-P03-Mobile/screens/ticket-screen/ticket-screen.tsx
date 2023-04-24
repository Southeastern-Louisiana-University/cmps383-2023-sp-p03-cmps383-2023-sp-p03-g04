import { Text, SafeAreaView, ScrollView, View } from "react-native";
import ticketStyle from "./ticketStyle";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@react-native-material/core";
import { COLORS } from "../../constants";

const TicketScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  interface BookingTickets {
    origin: string;
    destination: string;
    departTime: string;
    arrivalTime: string;
    seatNumber: string;
    ticketClass: string;
    date: string;
    trainCar: string;
  }

  const ticket: BookingTickets = {
    origin: "Dallas",
    destination: "Austin",
    departTime: "5:00 AM",
    arrivalTime: "9:00 AM",
    seatNumber: "12A",
    ticketClass: "First Class",
    date: "05/15/2023",
    trainCar: "Class B",
  };

  return (
    <SafeAreaView style={ticketStyle.container}>
      <ScrollView>
        <Text style={ticketStyle.title}>Your ticket is listed below</Text>
        <Divider
          style={{ marginTop: 10, marginBottom: 30 }}
          color={COLORS.tertiary}
        />
        <Text style={ticketStyle.header}>Ticket Details</Text>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Origin:</Text>
          <Text style={ticketStyle.value}>{ticket.origin}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Destination:</Text>
          <Text style={ticketStyle.value}>{ticket.destination}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Date:</Text>
          <Text style={ticketStyle.value}>{ticket.date}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Departure Time:</Text>
          <Text style={ticketStyle.value}>{ticket.departTime}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Arrival Time:</Text>
          <Text style={ticketStyle.value}>{ticket.arrivalTime}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Seat Number:</Text>
          <Text style={ticketStyle.value}>{ticket.seatNumber}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Train Car:</Text>
          <Text style={ticketStyle.value}>{ticket.trainCar}</Text>
        </View>
        <View style={ticketStyle.infoContainer}>
          <Text style={ticketStyle.label}>Ticket Class:</Text>
          <Text style={ticketStyle.value}>{ticket.ticketClass}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketScreen;
