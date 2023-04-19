import {
    Text,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import bookingStyle from "./bookingStyle";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import JourneyDetails from "../../components/journeyDetails";


    const BookingScreen =() =>{
        const navigation = useNavigation();
    
        useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
        }, []);

        return (
            <SafeAreaView style={bookingStyle.container}>
                <ScrollView>
                    <Text style={bookingStyle.title}>Book Your Journey!</Text>
                    <JourneyDetails navigation={navigation} />
                </ScrollView>
            </SafeAreaView>
        );
    };

export default BookingScreen;