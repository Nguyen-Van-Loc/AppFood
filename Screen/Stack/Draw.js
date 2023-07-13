import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import Tabbar from "./Tabbar";
import CustomDawr from "./CustomDawr";
import Cart from "../Cart/Cart";
import Taikhoan from "../Thongtin/TaiKhoan";

const Draw = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(navigation) => <CustomDawr {...navigation} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -20 },
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="trangchu "
        component={Tabbar}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Ionicons name="home-outline" size={22} color={color} />;
          },
          title: "Trang chủ",
        }}
      />
      <Drawer.Screen
        name="Cart1"
        component={Cart}
        options={{
          headerShown: true,
          title: "Giỏ hàng",
          drawerIcon: ({ color }) => {
            return <Ionicons name="cart-outline" size={22} color={color} />;
          },
          title: "Giỏ hàng",
        }}
      />
      <Drawer.Screen
        name="taiKhoan1"
        component={Taikhoan}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return <Ionicons name="person-outline" size={22} color={color} />;
          },
          title: "Tài khoản",
        }}
      />
    </Drawer.Navigator>
  );
};
export default Draw;
