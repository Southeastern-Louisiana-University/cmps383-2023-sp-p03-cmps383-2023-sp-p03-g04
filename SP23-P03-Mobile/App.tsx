import React from "react";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import BottomTabNavigator from "./navigation/bottom-tab-navigator";
import TopAppBar from "./navigation/top-app-bar";
import AppNavigator from "./navigation/app.navigator";
import AuthNavigator from "./navigation/auth-navigator";
import AuthBottomTabNavigator from "./navigation/auth-bottom-tab-navigator";
import AuthTopAppBar from "./navigation/auth-top-app-bar";


const App =() => {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
          <TopAppBar/>
          {/*<AuthTopAppBar/>*/}
          {/* <BottomTabNavigator/> */}
         <AuthBottomTabNavigator/>
      </NativeBaseProvider>
    </GestureHandlerRootView>
    
  );
}

export default App;
  

