import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import homeStyle from "./homeStyle";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  const HomeScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView style={homeStyle.container}>
        <ScrollView>
        <Text style={homeStyle.title}>This is the home screen</Text>
        
        </ScrollView>
      </SafeAreaView>
    );
  };  

export default HomeScreen;