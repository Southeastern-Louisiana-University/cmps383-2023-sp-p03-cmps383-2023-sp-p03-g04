import React from 'react';
import LoginScreen from '../screens/login-screen/login-screen';
import {ROUTES} from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from "../navigation/bottom-tab-navigator";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigator from './drawer-navigator';

const Drawer = createDrawerNavigator();

function AuthNavigator() {
   
  return (
    <NavigationContainer>
    <Drawer.Navigator>
      
      <Drawer.Screen name={ROUTES.HOME} component={DrawerNavigator} options={{headerShown:false}}/>
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;

