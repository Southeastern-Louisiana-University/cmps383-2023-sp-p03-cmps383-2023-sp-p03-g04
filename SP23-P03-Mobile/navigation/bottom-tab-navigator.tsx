import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookingScreen from '../screens/booking-screen/booking-screen';
import HomeScreen from "../screens/home-screen/home-screen";
import StatusScreen from "../screens/status-screen/status-screen";
import { NavigationContainer } from "@react-navigation/native";
import {ROUTES} from '../constants';
import { Entypo } from '@expo/vector-icons';
import { Icon } from "native-base";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({route}) => ({
          headerShown:false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if(route.name === ROUTES.HOME_TAB){
              iconName = focused ? 'home':'home-outline';
            } else if(route.name ===ROUTES.BOOKING){
              iconName = focused ? 'aircraft':'aircraft-outline';
            } else if(route.name === ROUTES.STATUS){
              iconName = focused ? 'clock':'clock-outline';
            }

            return <Icon as={Entypo} name={iconName} size={22} color={color}/>
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