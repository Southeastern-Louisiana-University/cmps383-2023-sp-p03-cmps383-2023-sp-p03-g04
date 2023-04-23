import {
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState} from "react";
import { 
  NativeBaseProvider, 
  Text, 
  Center, 
  Box, 
  Heading,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import homeStyle from "./homeStyle";

  const HomeScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <NativeBaseProvider>
        <SafeAreaView style={homeStyle.container}>
          <ScrollView>
          <Text style={homeStyle.entrack}>EnTrack</Text>
          <Text style={homeStyle.title}>Login to View Your Tickets</Text>
          
          </ScrollView>
        </SafeAreaView>
      </NativeBaseProvider>
    );
    
  };
    

export default HomeScreen;