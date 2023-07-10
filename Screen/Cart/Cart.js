import React, { useEffect, useState } from "react";
import {
  BackHandler,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api_Cart } from "../../api";
const widthScreen = Dimensions.get("window").width;
const HeightScreen = Dimensions.get("window").height;
const Cart = () => {
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [sum, setSum] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const getIdUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setItem(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const hienthi= new Intl.NumberFormat('vi-VN');
  const getItemCart = () => {
    fetch(Api_Cart)
      .then((res) => res.json())
      .then((data) => {
        setData(data), setData1(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  let getCart = data.find((cart) => cart.userId === item.id);
  if (getCart) {
    const products = getCart.products;
    let product = products.filter((product) => product.product.length > 0);
    setData(product);
  }
  if (getCart) {
     const products = getCart.products;
     const totalPrice =products.reduce((acc, product) => {
       return acc + product.totalPrice;
     }, 0);
     setSum(totalPrice)
  }
  
  const increaseQuantity = (cart_id) => {
    const cartItem = data1.find(
      (item1) => item1.id === item.id && item1.userId === item.id
    );
    const product1 = cartItem.products.find((item2) => item2.id === cart_id.id);
    product1.quantity = cart_id.quantity + 1;
    product1.totalPrice =
      cart_id.quantity *
      parseFloat(product1.product[0].gia.replace("₫", "").replace(".", ""));
    fetch(Api_Cart + "/" + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    getItemCart();
  };
  const decreaseQuantity = (cart_id) => {
    const cartItem = data1.find(
      (item1) => item1.id === item.id && item1.userId === item.id
    );
    const product1 = cartItem.products.find((item2) => item2.id === cart_id.id);
    product1.quantity = cart_id.quantity - 1;
    product1.totalPrice =
      cart_id.quantity *
      parseFloat(product1.product[0].gia.replace("₫", "").replace(".", ""));
    fetch(Api_Cart + "/" + item.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    getItemCart();
  };
  useEffect(() => {
    getItemCart();
    getIdUser();
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isFocused]);

  return (
    <View style={{ width: widthScreen, height: HeightScreen }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          zIndex: 1,
          marginLeft: 20,
          marginTop: 35,
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/130/130882.png",
          }}
        ></Image>
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          marginLeft: 50,
          marginTop: 35,
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20, marginLeft: 10, marginTop: -5 }}>
          Giỏ Hàng
        </Text>
      </View>
      <FlatList
        data={data}
        style={{ marginTop: 80 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <View
              style={{
                borderWidth: 1,
                padding: 20,
                borderRadius: 20,
                margin: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: item.product[0].image }}
                  />
                </View>
                <View style={{ flexDirection: "column", width: "80%" }}>
                  <Text style={{ fontSize: 18, marginLeft: 10 }}>
                    {item.product[0].title}
                  </Text>
                  <Text style={{ fontSize: 18, marginLeft: 10, color: "red" }}>
                    {item.product[0].gia}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    margin: 10,
                    height: 35,
                  }}
                >
                  {item.quantity <= 1 ? (
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        padding: 8,
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        style={{ width: 10, height: 10 }}
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/128/43/43625.png",
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={false}
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        padding: 8,
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        style={{ width: 10, height: 10 }}
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/128/43/43625.png",
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  <TextInput
                    style={{
                      width: 70,
                      textAlign: "center",
                      color: "red",
                      borderWidth: 1,
                    }}
                    keyboardType="numeric"
                  >
                    {item.quantity}
                  </TextInput>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item)}
                    style={{
                      padding: 8,
                      borderTopWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/2997/2997933.png",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 0.4,
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Tổng tiền: ₫</Text>
          <Text style={{ fontSize: 18 }}>{hienthi.format(sum)}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            marginBottom: -25,
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Cart;
