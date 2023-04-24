import {View, Text} from 'react-native';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import TopAppBar from './top-app-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './bottom-tab-navigator';

const AppNav = () => {
    return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
          <TopAppBar/>
          {/*<AuthTopAppBar/>*/}
          <BottomTabNavigator/>
         {/*<AuthBottomTabNavigator/>*/}
      </NativeBaseProvider>
    </GestureHandlerRootView>
    )
}

export default AppNav;