import React from 'react';
import LoginScreen from '../screens/login-screen/login-screen';
import {ROUTES} from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function AuthNavigator() {
   console.log(Stack);
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;

