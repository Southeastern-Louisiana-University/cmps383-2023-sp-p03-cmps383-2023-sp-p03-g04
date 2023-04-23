import React, { useState } from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {COLORS,ROUTES} from '../constants';
import {Modal, Pressable, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from "../screens/login-screen/login-screen";
import { Box, Button, Center, Text } from "native-base";
import loginStyle from "../screens/login-screen/loginStyle";




const AuthTopAppBar = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  return(
    <View>
      <AppBar style={{paddingTop: insets.top}}
        title= "EnTrack"
        centerTitle={true}
        color={COLORS.tertiary}
        tintColor={COLORS.white}
        leading={props => (
          <IconButton  icon={props => <Icon name="account-circle" {...props} />} {...props} />
        )}
        trailing={props => (
          <HStack>
            <IconButton
              icon={
                props => <Icon name="logout" {...props} 
                />
              }
              onPress={() => setModalVisible(true)}
              {...props}
            />
          </HStack>
        )}
      />

      <View style={styles.centeredView}>
        <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text style={styles.textStyle2}>Sign Out?</Text>
           <Button style={[loginStyle.button, styles.buttonYes]}>
            <Text style={loginStyle.textStyle}>Yes</Text>
           </Button>
            <Button
              style={[loginStyle.button, loginStyle.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
                <Text style={loginStyle.textStyle}>No</Text>
            </Button>
          </View>
        </View>
        </Modal>
      </View>
    </View>
    );
  
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonYes: {
    backgroundColor: '#5359d1',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle2: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
    fontSize: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const AppProvider = () =>{
  return(
    <SafeAreaProvider>
      <AuthTopAppBar/>
    </SafeAreaProvider>
  )
}

export default AuthTopAppBar;
