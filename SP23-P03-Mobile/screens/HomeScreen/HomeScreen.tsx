import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
  } from "react-native";
  import React, { useLayoutEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  const HomeScreen = () => {
    const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <Text style={styles.title}>This is the home screen</Text>
        
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#ffffff',
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      color: '#20232a',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
  

export default HomeScreen;