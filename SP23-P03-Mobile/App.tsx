import React from "react";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import BottomTabNavigator from "./navigation/bottom-tab-navigator";
import TopAppBar from "./navigation/top-app-bar";
import AppNavigator from "./navigation/app.navigator";
import AuthNavigator from "./navigation/auth-navigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./authentication/auth-context";


const App =() => {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
          <TopAppBar/>
          <BottomTabNavigator/>
      </NativeBaseProvider>
    </GestureHandlerRootView>
    
  );
}

export default App;
  

