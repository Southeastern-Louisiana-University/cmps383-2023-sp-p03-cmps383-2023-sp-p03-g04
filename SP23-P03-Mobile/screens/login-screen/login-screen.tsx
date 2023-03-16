import {
    SafeAreaView,
    ScrollView,
  } from "react-native";
import loginStyle from "./loginStyle";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, FormControl, HStack, Input, Link, NativeBaseProvider, VStack, Text, Center, Box, Heading } from "native-base";


    const LoginScreen = () => {
        const navigation = useNavigation();
        useLayoutEffect(() => {
            navigation.setOptions({
              headerShown: false,
            });
          }, []);

        return(
          <NativeBaseProvider>
            <SafeAreaView style={loginStyle.containerTitle}>
                <ScrollView>
                  <Text style={loginStyle.title}>EnTrack</Text>
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
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" />
                    <Link _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500"
                  }} alignSelf="flex-end" mt="1">
                      Forget Password?
                    </Link>
                  </FormControl>
                  <Button mt="2" colorScheme="indigo">
                    Sign in
                  </Button>
                  <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="coolGray.600">
                      I'm a new user.{" "}
                    </Text>
                    <Link _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm"
                  }} href="#">
                      Sign Up
                    </Link>
                  </HStack>
                </VStack>
                </Box>
                </Center>
              </ScrollView>
            </SafeAreaView>
          </NativeBaseProvider>

        );

    };

export default LoginScreen;