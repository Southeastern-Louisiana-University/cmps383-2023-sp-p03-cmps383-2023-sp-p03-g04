import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login-screen/login-screen';
import {ROUTES} from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from "../navigation/bottom-tab-navigator";

const Stack = createStackNavigator();

function AuthNavigator() {
    console.log(Stack);
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator}/>
    
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;