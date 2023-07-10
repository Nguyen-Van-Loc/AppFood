import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const CustomDawr = (navigation) => {
  const navigation1 = useNavigation();
  const isFocused = useIsFocused();
  const [name1, setName] = useState("");
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("nit");
      navigation1.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };
  const getLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setName(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };

  useEffect(() => {
    getLogin();
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...navigation}
        contentContainerStyle={{ backgroundColor: "green" }}
      >
        <ImageBackground
          style={{ padding: 20, marginTop: -30, height: 200 }}
          source={{
            uri: "https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
        >
          <Image
            style={{ width: 80, height: 80, marginTop: 30 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/4825/4825038.png",
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Roboto",
              marginTop: 10,
            }}
          >
            {name1.name}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: "white", flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...navigation}></DrawerItemList>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "gray" }}>
        <TouchableOpacity onPress={removeValue}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDawr;
