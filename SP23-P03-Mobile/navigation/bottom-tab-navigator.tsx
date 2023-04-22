import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import BookingScreen from '../screens/booking-screen/booking-screen';
import HomeScreen from "../screens/home-screen/home-screen";
import StatusScreen from "../screens/status-screen/status-screen";
import { NavigationContainer } from "@react-navigation/native";
import {COLORS, ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons'
import CheckInScreen from "../screens/checkin-screen/checkin-screen";
import NotificationScreen from "../screens/notif-screen/notif-screen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ()=>{
  return(
      <NavigationContainer>
      <Tab.Navigator initialRouteName={ROUTES.BOOKING} 
        screenOptions={({route}) => ({
          headerShown:false,
          tabBarStyle: styles.tabBarStyle,
          tabBarInactiveTintColor: COLORS.white,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if(route.name === ROUTES.HOME_TAB){
              iconName = focused ? 'home':'home-outline';
            } else if(route.name ===ROUTES.BOOKING){
              iconName = focused ? 'train':'train-outline';
            } else if(route.name === ROUTES.STATUS){
              iconName = focused ? 'time':'time-outline';
            } else if(route.name === ROUTES.CHECKIN){
              iconName = focused ? 'checkmark-circle':'checkmark-circle-outline';
            } else if(route.name === ROUTES.NOTIFICATIONS){
              iconName = focused ? 'notifications':'notifications-outline';
            }

            return <Icon name={iconName} size={22} color={color}/>
          },
        })}>
        <Tab.Screen name={ROUTES.HOME_TAB} component={HomeScreen} />
        <Tab.Screen name={ROUTES.STATUS_TAB} component={StatusScreen} />
        <Tab.Screen name={ROUTES.BOOKING} component={BookingScreen} />
        <Tab.Screen name={ROUTES.CHECKIN_TAB} component={CheckInScreen}/>
        <Tab.Screen name={ROUTES.NOTIFICATIONS_TAB} component={NotificationScreen}/>
        
      </Tab.Navigator>
      </NavigationContainer>

  );
};


export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position:'absolute',
    backgroundColor: COLORS.tertiary,
    borderTopWidth: 0,

  },
});