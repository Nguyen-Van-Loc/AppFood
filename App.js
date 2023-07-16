import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Login from "./Screen/Login/Login";
import Logup from "./Screen/Logup/Logup";
import Chitiet from "./Screen/Detal/Chitiet";
import HomeStack from "./Screen/Stack/HomeStack";
import Taikhoan from "./Screen/Thongtin/TaiKhoan";
import Danhmucsp from "./Screen/Components/Danhmucsp";
import Oder from "./Screen/Thongtin/Oder";
import Cart from "./Screen/Cart/Cart";
import { GestureDetector } from "react-native-gesture-handler";
import Doimatkhau from "./Screen/Thongtin/Doimatkhau";
const Screen = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Screen.Navigator>
        <Screen.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, animation: "slide_from_right" }}
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
            animation: "slide_from_right",
          }}
        />
        <Screen.Screen
          name="taiKhoan"
          component={Taikhoan}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Screen.Screen
          name="Danh muc"
          component={Danhmucsp}
          options={{
            headerShown: true,
            title: "Danh mục",
            animation: "slide_from_right",
          }}
        />
        <Screen.Screen
          name="Lichsu"
          component={Oder}
          options={{
            headerShown: true,
            title: "Lịch sử mua hàng",
            animation: "slide_from_right",
          }}
        />
        <Screen.Screen
          name="cart"
          component={Cart}
          options={{
            headerShown: true,
            title: "Giỏ hàng",
            animation: "slide_from_right",
          }}
        />
        <Screen.Screen
          name="DoiPass"
          component={Doimatkhau}
          options={{
            headerShown: true,
            title: "Đổi mật khẩu",
            animation: "slide_from_right",
          }}
        />
      </Screen.Navigator>
    </NavigationContainer>
  );
};
export default App;
