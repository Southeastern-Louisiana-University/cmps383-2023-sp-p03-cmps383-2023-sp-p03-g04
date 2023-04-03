import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import notifStyle from "./notifStyle";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  const NotificationScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView style={notifStyle.container}>
        <ScrollView>
        <Text style={notifStyle.title}>This is the notifications screen</Text>
        
        </ScrollView>
      </SafeAreaView>
    );
  };  

export default NotificationScreen;