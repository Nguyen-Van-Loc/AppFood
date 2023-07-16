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
import { Api_Cart, Api_Oder } from "../../api";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
const widthScreen = Dimensions.get("window").width;
const Cart = () => {
  const [id, setID] = useState("");
  const [count, setCount] = useState(0);
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [check, setCheck] = useState(true);
  const [sum, setSum] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getIdUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      getItemCart(JSON.parse(jsonValue));
      return jsonValue != null ? setItem(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const hienthi = new Intl.NumberFormat("vi-VN");
  const getItemCart = (item) => {
    fetch(Api_Cart)
      .then((res) => res.json())
      .then((data) => {
        let getCart = data.find((cart) => cart.userId === item.id);
        if (getCart) {
          setID(getCart.id);
          const products = getCart.products;
          if (products.length > 0) {
          } else {
            setCheck(false);
          }
          let product = products.filter(
            (product) => product.product.length > 0
          );
          setData(product);
        } else {
          setCheck(false);
          setID('');
        }
        if (getCart) {
          const products = getCart.products;
          const totalPrice = products.reduce((acc, product) => {
            return acc + product.totalPrice;
          }, 0);
          setSum(totalPrice);
        }
        setData1(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const Delete = (cart_id) => {
    const cartItem = data1.find((item1) => item1.userId === item.id);
    const product1 = cartItem.products.filter(
      (item2) => item2.id !== cart_id.id
    );
    cartItem.products = product1;
    fetch(Api_Cart + "/" + cartItem.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    getItemCart(item);
    setCheck(check);
  };
  const AddOder = () => {
    const add = {
      id: count.length + 1,
      userId: item.id,
      products: data,
      sum: sum,
    };
    fetch(
      Api_Oder,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(add),
      },
      fetch(Api_Cart + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).then(res=>{getItemCart(item)});
  };
  const increaseQuantity = (cart_id) => {
    const cartItem = data1.find((item1) => item1.userId === item.id);
    const product1 = cartItem.products.find((item2) => item2.id === cart_id.id);
    product1.quantity = cart_id.quantity + 1;
    product1.totalPrice =
      cart_id.quantity *
      parseFloat(product1.product[0].gia.replace("₫", "").replace(".", ""));
      console.log(cart_id.id)
    fetch(Api_Cart + "/" + cartItem.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    getItemCart(item);
  };
  const decreaseQuantity = (cart_id) => {
    const cartItem = data1.find((item1) => item1.userId === item.id);
    const product1 = cartItem.products.find((item2) => item2.id === cart_id.id);
    product1.quantity = cart_id.quantity - 1;
    product1.totalPrice =
      cart_id.quantity *
      parseFloat(product1.product[0].gia.replace("₫", "").replace(".", ""));
    fetch(Api_Cart + "/" + cartItem.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    getItemCart(item);
  };
  useEffect(() => {
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
    <View style={{ width: widthScreen, flex: 1 }}>
      {check ? (
        <View style={{ width: widthScreen, flex: 1 }}>
          <FlatList
            data={data}
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
                  <TouchableOpacity
                    style={{ position: "absolute", right: 0, margin: 10 }}
                    onPress={() => Delete(item)}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/9068/9068699.png",
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image
                        style={{ width: 70, height: 70 }}
                        source={{ uri: item.product[0].image }}
                      />
                    </View>
                    <View style={{ flexDirection: "column", width: "75%" }}>
                      <Text style={{ fontSize: 18, marginLeft: 10 }}>
                        {item.product[0].title}
                      </Text>
                      <Text
                        style={{ fontSize: 18, marginLeft: 10, color: "red" }}
                      >
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
              position: "relative",
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
              onPress={() => AddOder()}
              style={{
                backgroundColor: "red",
                width: "25%",
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: widthScreen,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/6002/6002155.png",
            }}
          />
          <Text>Không có sản phẩm trong giỏ hàng</Text>
        </View>
      )}
    </View>
  );
};
export default Cart;
