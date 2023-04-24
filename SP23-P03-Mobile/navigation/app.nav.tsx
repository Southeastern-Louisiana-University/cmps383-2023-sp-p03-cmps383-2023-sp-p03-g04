import {View, Text} from 'react-native';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import TopAppBar from './top-app-bar';
import AuthTopAppBar from './auth-top-app-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './bottom-tab-navigator';
import AuthBottomTabNavigator from './auth-bottom-tab-navigator';
import { getCurrentUser } from '../data/queries/user-queries';

const AppNav = () => {
    const currentUser = getCurrentUser(); 
  
    const renderAuth = () => {
      if (currentUser === null) {
        console.log(currentUser);
        return (
          <>
            <AuthTopAppBar />
            <AuthBottomTabNavigator />
          </>
        );
      } else {
        console.log('NULL');
        return( 
            <>
            <TopAppBar />
            <BottomTabNavigator />
         </>
        )
      }
    };
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          {renderAuth()}
        </NativeBaseProvider>
      </GestureHandlerRootView>
    );
  };
  
  export default AppNav;

  
  
  
  
  
  