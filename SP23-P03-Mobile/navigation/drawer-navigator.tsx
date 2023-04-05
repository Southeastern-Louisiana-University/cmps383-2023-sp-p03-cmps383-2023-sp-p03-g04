import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import HomeScreen from "../screens/home-screen/home-screen";
import BookingScreen from '../screens/booking-screen/booking-screen';
import StatusScreen from "../screens/status-screen/status-screen";
import BottomTabNavigator from './bottom-tab-navigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name={ROUTES.HOME_TAB} component={BottomTabNavigator}/>
        <Drawer.Screen name={ROUTES.BOOKING_DRAWER} component={BookingScreen}/>
        <Drawer.Screen name={ROUTES.STATUS_DRAWER} component={StatusScreen}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;