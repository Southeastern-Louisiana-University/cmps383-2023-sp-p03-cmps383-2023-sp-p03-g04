import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../screens/booking-screen/booking-screen';
import HomeScreen from "../screens/home-screen/home-screen";
import StatusScreen from "../screens/status-screen/status-screen";
import { NavigationContainer } from "@react-navigation/native";
import {COLORS, ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({route}) => ({
          headerShown:false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if(route.name === ROUTES.HOME_TAB){
              iconName = focused ? 'home':'home-outline';
            } else if(route.name ===ROUTES.BOOKING){
              iconName = focused ? 'train':'train-outline';
            } else if(route.name === ROUTES.STATUS){
              iconName = focused ? 'time':'time-outline';
            }

            return <Icon name={iconName} size={22} color={color}/>
          },
        })}>
        <Tab.Screen name={ROUTES.HOME_TAB} component={HomeScreen} />
        <Tab.Screen name={ROUTES.BOOKING} component={BookingScreen} />
        <Tab.Screen name={ROUTES.STATUS} component={StatusScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default BottomTabNavigator;