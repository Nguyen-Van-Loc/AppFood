import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";
const widthScreen = Dimensions.get("window").width;
const HeightScreen = Dimensions.get("window").height;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
const Thongtin = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [name, setName] = useState({});
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setName(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem("nit");
    navigation.navigate("Login");
  } catch (e) {
    console.log(e);
  }
};
  useEffect(() => {
    getUser();
  }, [isFocused]);
  return (
    <SafeAreaView>
      <View style={style.contarner}>
        <View>
          <ImageBackground
            style={{ width: "100%", height: 250 }}
            source={{
              uri: "https://images.pexels.com/photos/4064446/pexels-photo-4064446.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            }}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                bottom: 80,
                left: 30,
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/256/4825/4825038.png",
              }}
            />
            <Text
              style={{
                position: "absolute",
                bottom: 30,
                left: 20,
                color: "white",
                fontSize: 25,
              }}
            >
              {name.name}
            </Text>
          </ImageBackground>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("taiKhoan")}>
              <View style={style.view}>
                <Image
                  style={style.image}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/256/7246/7246434.png",
                  }}
                />
                <Text style={style.fonttext}>Thông tin tài khoản</Text>
                <Image
                  style={style.image1}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/130/130884.png",
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Lichsu")}>
              <View style={style.view}>
                <Image
                  style={style.image}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/256/7457/7457418.png",
                  }}
                />
                <Text style={style.fonttext}>Đơn hàng đã mua</Text>
                <Image
                  style={style.image1}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/130/130884.png",
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("cart")}>
              <View style={style.view}>
                <Image
                  style={style.image}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/256/9060/9060681.png",
                  }}
                />
                <Text style={style.fonttext}>Giỏ Hàng</Text>
                <Image
                  style={style.image1}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/130/130884.png",
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={style.view1}>
              <Image
                style={style.image}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/256/8136/8136636.png",
                }}
              />
              <Text style={style.fonttext}>Chia sẻ</Text>
              <Image
                style={style.image1}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/130/130884.png",
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View style={style.view}>
            <Image
              style={style.image}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/256/8662/8662591.png",
              }}
            />
            <Text style={style.fonttext}>Hỗ trợ</Text>
            <Image
              style={style.image1}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/130/130884.png",
              }}
            />
          </View>
          <View style={style.view1}>
            <Image
              style={style.image}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/256/7246/7246435.png",
              }}
            />
            <Text style={style.fonttext}>Cài đặt</Text>
            <Image
              style={style.image1}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/130/130884.png",
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "42%",
              flexDirection: "row",
              borderRadius: 10,
              padding: 10,
              backgroundColor: "red",
            }}
            onPress={() => removeValue()}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/10309/10309341.png",
              }}
            />
            <Text style={{ fontSize: 20, marginLeft: 5, color: "white" }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  contarner: {
    width: widthScreen,
    height: HeightScreen,
    backgroundColor: "#B7BDBD",
  },
  view: { flexDirection: "row", borderBottomWidth: 0.3, padding: 5 },
  view1: { borderBottomWidth: 0, flexDirection: "row", padding: 5 },
  fonttext: { fontSize: 20, marginTop: 10 },
  image: {
    width: 30,
    height: 30,
    margin: 10,
  },
  image1: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 0,
    top: 20,
  },
});
export default Thongtin;
