import React from 'react';
import LoginScreen from '../screens/login-screen/login-screen';
import {ROUTES} from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from "../navigation/bottom-tab-navigator";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function AuthNavigator() {
   
  return (
    <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Drawer.Screen name={ROUTES.HOME} component={BottomTabNavigator}/>
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;

