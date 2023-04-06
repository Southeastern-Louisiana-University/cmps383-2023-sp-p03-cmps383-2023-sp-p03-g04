import React from "react";
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./navigation/app.navigator";
import BottomTabNavigator from "./navigation/bottom-tab-navigator";
import AuthNavigator from "./navigation/auth-navigator";
import DrawerNavigator from "./navigation/drawer-navigator";


const App =() => {
  return (
    <NativeBaseProvider>
      
      <BottomTabNavigator/>
    </NativeBaseProvider>
  );
}

export default App;
  

