import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import ticketStyle from "./ticketStyle";
  import React, { useLayoutEffect } from "react";
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
  
    return (
      <SafeAreaView style={ticketStyle.container}>
        <ScrollView>
        <Text style={ticketStyle.title}>Your tickets are listed below</Text>
        <Divider style={{ marginTop: 60 }} leadingInset={32} trailingInset={32} color={COLORS.tertiary} />
        
        
        </ScrollView>
      </SafeAreaView>
    );
  };  

export default TicketScreen;