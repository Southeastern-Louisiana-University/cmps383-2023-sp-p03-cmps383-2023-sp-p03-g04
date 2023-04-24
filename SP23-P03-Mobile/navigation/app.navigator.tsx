import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/login-screen/login-screen";
import BookingScreen from '../screens/booking-screen/booking-screen';
import { ROUTES } from '../constants';

const {Navigator, Screen} = createNativeStackNavigator();

const AppNavigator =() =>(
    <NavigationContainer>
        <Navigator initialRouteName={ROUTES.BOOKING}>
            <Screen name={ROUTES.LOGIN} component={LoginScreen}/>
            <Screen name={ROUTES.BOOKING} component={BookingScreen}/>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;