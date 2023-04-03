import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import checkinStyle from "./checkinStyle";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  const CheckInScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView style={checkinStyle.container}>
        <ScrollView>
        <Text style={checkinStyle.title}>This is the check in screen</Text>
        
        </ScrollView>
      </SafeAreaView>
    );
  };  

export default CheckInScreen;