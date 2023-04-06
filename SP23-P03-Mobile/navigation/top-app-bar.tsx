import React from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {COLORS,ROUTES} from '../constants';
import {View} from 'react-native';
import {useSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';

const TopAppBar = () => {
  const insets = useSafeAreaInsets();
  return(
    <View>
      <AppBar style={{paddingTop: insets.top}}
        title= "Temporary Header Name"
        centerTitle={true}
        color={COLORS.tertiary}
        tintColor={COLORS.white}
        leading={props => (
          <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
        )}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => <Icon name="dots-vertical" {...props} />}
              {...props}
            />
          </HStack>
        )}
      />
    </View>
    );
  
};

const AppProvider = () =>{
  return(
    <SafeAreaProvider>
      <TopAppBar/>
    </SafeAreaProvider>

  )
}

export default TopAppBar;
