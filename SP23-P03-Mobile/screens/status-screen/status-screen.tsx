import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import statusStyle from "./statusStyle";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  const StatusScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView style={statusStyle.container}>
        <ScrollView>
        <Text style={statusStyle.title}>This is the status screen</Text>
        
        </ScrollView>
      </SafeAreaView>
    );
  };  

export default StatusScreen;