import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import ticketStyle from "./ticketStyle";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  const TicketScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView style={ticketStyle.container}>
        <ScrollView>
        <Text style={ticketStyle.title}>This is the ticket screen</Text>
        
        </ScrollView>
      </SafeAreaView>
    );
  };  

export default TicketScreen;