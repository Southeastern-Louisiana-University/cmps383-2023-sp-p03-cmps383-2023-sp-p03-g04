import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import HomeScreen from "../screens/home-screen/home-screen";
import LoginScreen from '../screens/login-screen/login-screen';
import BottomTabNavigator from '../navigation/bottom-tab-navigator';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <NavigationContainer>
    <Drawer.Navigator>
        <Drawer.Screen name={ROUTES.HOME_TAB} component={BottomTabNavigator}/>
        <Drawer.Screen name={ROUTES.LOGIN} component={LoginScreen}/>
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;