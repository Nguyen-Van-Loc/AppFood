import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React,{useEffect} from 'react'
import Home from '../Home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Thongtin from '../Thongtin/Thongtin';
import { BackHandler } from 'react-native';
import Search from '../Search/Search';
const Tab=createBottomTabNavigator();
const Tabbar = (navigation) => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let IconName;
            if (route.name === "Trang chủ") {
              IconName = focused ? "home" : "home-outline";
            }
            if (route.name === "Tìm Kiếm") {
              IconName = focused ? "search" : "search-outline";
            }
            if (route.name === "Người dùng") {
              IconName = focused ? "person" : "person-outline";
            }
            return (
              <Ionicons name={IconName} size={22} color={color}></Ionicons>
            );
          },
        })}
      >
        <Tab.Screen
          name="Trang chủ"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Tìm Kiếm"
          component={Search}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Người dùng"
          component={Thongtin}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
}

export default Tabbar;