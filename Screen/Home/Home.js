import React, { useEffect, useState } from "react";
import Header from "./Header";
import Danhmuc from "../Components/Danhmuc";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,Alert,BackHandler
} from "react-native";
import ListFood from "./ListFood";
import Sanpham from "./SanPham";
import DanhmucText from "../Components/DanhmucText";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const Home = ({ navigation }) => {
 
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{ width: 30, height: 30, marginTop: 30, marginLeft: 15 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/1828/1828859.png",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 7 }}>
          <Header />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <DanhmucText title="Danh mục" />
            <Danhmuc title="Xem thêm" />
          </View>
          <ListFood />
        </View>
        <View
          style={{
            backgroundColor: "#D7D9D7",
            width: "100%",
            height: 10,
            marginTop: 10,
          }}
        ></View>
        <View style={{ paddingHorizontal: 7, marginBottom: -10 }}>
          <DanhmucText title="Gợi ý hôm nay" />
        </View>
        <Sanpham />
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 200,
  },
  styleImage: {
    marginTop: 10,
    borderRadius: 20,
    width: 300,
    height: "90%",
    marginRight: 15,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    borderWidth: 0.5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 10,
    margin: 5,
    backgroundColor: "white",
  },
  item: {
    width: "100%",
    height: 170,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: { fontSize: 15, textTransform: "uppercase", margin: 5 },
  textPrice: {
    fontSize: 17,
    color: "red",
    marginTop: 5,
    margin: 5,
    justifyContent: "flex-end",
  },
  row: {
    marginTop: 17,
    backgroundColor: "#F5F5F5",
  },
  yeuthich: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#F28232",
    marginLeft: -2,
  },
});
export default Home;
