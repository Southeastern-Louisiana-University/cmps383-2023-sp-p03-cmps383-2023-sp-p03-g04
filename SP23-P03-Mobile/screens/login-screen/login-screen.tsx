import {
    SafeAreaView,
    ScrollView,
    Modal,
    View,
    Alert,
  } from "react-native";
import loginStyle from "./loginStyle";
import React, { useState, useContext} from "react";
import { 
    Button, 
    FormControl, 
    HStack, 
    Input, 
    Link, 
    NativeBaseProvider, 
    VStack, 
    Text, 
    Center, 
    Box, 
    Heading,
    Icon
  } from "native-base";
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "../../Config";
import axios from "axios";
import { User } from "../../data/types/user-types";
import { useAuth } from "../../authentication/auth-context";

interface LoginScreenProps{
  navigation: any;
}

    const LoginScreen = (props: LoginScreenProps) => {
      
     

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      

      const auth = useAuth()

     
      const handleLogin = async (username, password) => {
        await auth.login(username,password);

          Alert.alert('Logged in successfully!');
          
      };

      const handleLogout = async (username, password) => {
        await auth.logout();
          
      };

      const[modalVisible, setModalVisible] = useState(false);

      function pressHandler(){
        setModalVisible(true);
      }


        return(
          <NativeBaseProvider>
            <SafeAreaView style={loginStyle.containerTitle}>
                <ScrollView>
                  <Center style={loginStyle.center}>
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                      <Heading size="lg" fontWeight="600" color="coolGray.800">
                        Welcome
                      </Heading>
                      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
                        Sign in to continue!
                      </Heading>
                  <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input 
                      placeholder="Username"
                      value={username}
                      onChangeText={(text) => setUsername(text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    />
                    <Link _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500"
                  }} alignSelf="flex-end" mt="1">
                      Forget Password?
                    </Link>
                  </FormControl>
                  <Button mt="2" colorScheme="indigo" onPress={() => handleLogin(username, password)}>
                    Sign in
                  </Button>
                  <HStack mt="6" justifyContent="center">
                    
                    <Text fontSize="sm" color="coolGray.600">
                      I'm a new user.{" "}
                    </Text>
                    <Link onPress={pressHandler}
                     _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm"
                  }} href="#">
                     Sign Up
                    </Link>
                    </HStack>
                    <View style={loginStyle.centeredView}>
                      <Modal
                        animationType="fade"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() =>{
                          Alert.alert('Modal has been closed');
                          setModalVisible(!modalVisible);
                        }}>
                        <View style={loginStyle.centeredView}>
                          <View style={loginStyle.modalView}>
                          <Center style={loginStyle.center}>
                            <Box safeArea p="2" w="90%" maxW="290" py="8">
                                <Heading size="lg" color="coolGray.800" fontWeight="semibold">
                                Sign up to continue!
                                </Heading>
                                <VStack space={3} mt="10">
                                <FormControl>
                                    <FormControl.Label>Username</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input type="password" />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Confirm Password</FormControl.Label>
                                    <Input type="password" />
                                </FormControl>
                                <Button mt="2" colorScheme="indigo">
                                    Sign up
                                </Button>
                                </VStack>
                            </Box>
                        </Center>
                            <Button startIcon={<Icon as={Entypo} name="cross"/>}
                              style={[loginStyle.button, loginStyle.buttonClose]}
                              onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={loginStyle.textStyle}>Close</Text>
                            </Button>
                            
                          </View>
                        </View>
                      </Modal>
                    </View>
                </VStack>
                </Box>
                </Center>
              </ScrollView>
            </SafeAreaView>
          </NativeBaseProvider>

        );

    };
  

export default LoginScreen;