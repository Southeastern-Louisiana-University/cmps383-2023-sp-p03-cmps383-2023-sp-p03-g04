import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../screens/booking-screen/booking-screen';
import HomeScreen from "../screens/home-screen/home-screen";
import StatusScreen from "../screens/status-screen/status-screen";
import { NavigationContainer } from "@react-navigation/native";
import {ROUTES} from '../constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name={ROUTES.HOME_TAB} component={HomeScreen} />
        <Tab.Screen name={ROUTES.BOOKING} component={BookingScreen} />
        <Tab.Screen name={ROUTES.STATUS} component={StatusScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default BottomTabNavigator;