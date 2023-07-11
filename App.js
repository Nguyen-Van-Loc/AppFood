import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Login from "./Screen/Login/Login";
import Logup from "./Screen/Logup/Logup";
import Chitiet from "./Screen/Detal/Chitiet";
import HomeStack from "./Screen/Stack/HomeStack";
import Taikhoan from "./Screen/Thongtin/TaiKhoan";
import Danhmucsp from "./Screen/Components/Danhmucsp";
const Screen = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Screen.Navigator>
        <Screen.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Screen.Screen
          name="Logup"
          component={Logup}
          options={{ headerShown: false }}
        />
        <Screen.Screen
          name="Home356"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Screen.Screen
          name="Chitiet1"
          component={Chitiet}
          options={{
            headerShown: false,
          }}
        />
        <Screen.Screen
          name="taiKhoan"
          component={Taikhoan}
          options={{
            headerShown: false,
          }}
        />
        <Screen.Screen
          name="Danh muc"
          component={Danhmucsp}
          options={{
            headerShown: true,
            title:'Danh mục'
          }}
        />
      </Screen.Navigator>
    </NavigationContainer>
  );
};
export default App;
