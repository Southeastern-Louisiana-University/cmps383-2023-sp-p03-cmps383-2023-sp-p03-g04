import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
import loginStyle from "./loginStyle";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";


    const LoginScreen = () => {
        const navigation = useNavigation();
        useLayoutEffect(() => {
            navigation.setOptions({
              headerShown: false,
            });
          }, []);

        return(
            <SafeAreaView style={loginStyle.containerTitle}>
                <ScrollView>
                  <Text style={loginStyle.title}>EnTrack</Text>
                  <Text style={loginStyle.welcomeTitle}>Welcome to EnTrack!</Text>
                  <Text style={loginStyle.subCaption}>Please sign in below.</Text>
                </ScrollView>
            </SafeAreaView>

        );

    };

export default LoginScreen;