import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeScreenContainer } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import Home from "../Home/Home";
import Chitiet from "../Detal/Chitiet";
import Draw from "./Draw";
import Tabbar from "./Tabbar";
import { Alert, BackHandler, StyleSheet } from "react-native";
const Screen = createNativeStackNavigator();
const HomeStack = () => {
  useEffect(()=>{
     const backAction = () => {
      Alert.alert('', 'Bạn có muốn thoát ứng dụng không ? ', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Screen.Navigator>
      <Screen.Screen
        name="tarb3"
        component={Draw}
        options={{ headerShown: false }}
      />
      <Screen.Screen
        name="tarb32"
        component={Tabbar}
        options={{ headerShown: false }}
      />
    </Screen.Navigator>
  );
};
export default HomeStack;
