import React, { useState } from 'react';
import LoginScreen from '../screens/login-screen/login-screen';
import {ROUTES} from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottom-tab-navigator';


const Stack = createStackNavigator();

function AuthNavigator() {
  const [loginState, setLoginState] = useState({
    authCookie: "",
    user: {},
  });

   console.log(Stack);
  return (
    
    <Stack.Navigator initialRouteName={ROUTES.BOOKING_TAB} screenOptions={{}}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen}/>
      <Stack.Screen name={ROUTES.BOOKING_TAB} component={BottomTabNavigator}/>
    </Stack.Navigator>

  );
}

export default AuthNavigator;

