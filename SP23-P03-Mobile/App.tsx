import React from "react";
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import BottomTabNavigator from "./navigation/bottom-tab-navigator";
import TopAppBar from "./navigation/top-app-bar";




const App =() => {
  return (
    <NativeBaseProvider>
       <TopAppBar/>
      <BottomTabNavigator/>
    </NativeBaseProvider>
  );
}

export default App;
  

