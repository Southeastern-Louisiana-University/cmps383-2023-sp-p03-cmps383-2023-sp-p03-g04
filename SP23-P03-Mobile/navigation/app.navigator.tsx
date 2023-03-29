import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/login-screen/login-screen";
import HomeScreen from '../screens/home-screen/home-screen';
import StatusScreen from '../screens/status-screen/status-screen';
import BookingScreen from '../screens/booking-screen/booking-screen';

const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigator =() =>(
    <NavigationContainer>
        <Navigator initialRouteName="Home">
            <Screen name="Home" component={HomeScreen}/>
            <Screen name="Booking" component={BookingScreen}/>
            <Screen name="Status" component={StatusScreen}/>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;