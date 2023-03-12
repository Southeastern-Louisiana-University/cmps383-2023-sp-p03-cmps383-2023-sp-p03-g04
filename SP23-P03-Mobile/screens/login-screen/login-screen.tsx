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
            <SafeAreaView style={loginStyle.container}>
                <ScrollView>
                  <Text style={loginStyle.title}>This is the login screen</Text>
                
                </ScrollView>
            </SafeAreaView>

        );

    };

export default LoginScreen;