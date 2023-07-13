import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api_Food, Api_Cart, Api_Favourite } from "../../api";
import { TextInput } from "react-native-gesture-handler";
const Chitiet = ({ route, navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [nit, setGetCart] = useState([]);
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const item = route.params.Data;
  const getIduser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setCart(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  const addToCart = async () => {
    fetch(Api_Cart)
      .then((res) => res.json())
      .then((data) => {
        let check = data.find((item) => item.userId === cart.id);
        if (check) {
          const product = {
            id: check.products.length + 1,
            product: [item],
            quantity: quantity,
            totalPrice:
              quantity * parseFloat(item.gia.replace("₫", "").replace(".", "")),
          };
          check.products.push(product);
          fetch(Api_Cart + "/" + check.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(check),
          }).then(res=>res.json()).catch(err=>console.log(err));
        } else {
          const AddNew = {
            userId: cart.id,
            products: [
              {
                id: nit.length + 1,
                product: [item],
                quantity: quantity,
                totalPrice:
                  quantity *
                  parseFloat(item.gia.replace("₫", "").replace(".", "")),
              },
            ],
          };
          fetch(Api_Cart, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(AddNew),
          }).then((res) => res.json());
        }
      });
      showModal()
      ToastAndroid.showWithGravity("Thêm sản phẩm vào giỏ hàng thành công",ToastAndroid.LONG,ToastAndroid.BOTTOM);
  };
  useEffect(() => {
    getIduser();
  });
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          zIndex: 1,
          marginLeft: 20,
          marginTop: 35,
          backgroundColor: "#FF9633",
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
      <View style={{ width: "100%", height: 300 }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: item.image }}
        />
      </View>

      <ScrollView style={style.thongtin} showsVerticalScrollIndicator={false}>
        <View style={style.viewsp}>
          <Text style={style.tensp}>{item.title}</Text>
        </View>
        <View style={style.viewgia}>
          <Text style={{ color: "red", fontSize: 17 }}>{item.gia}</Text>
        </View>
        <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
          <Text>
            Đã bán:
            <Text>{item.daban}</Text>
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              backgroundColor: "rgba(0,0,0,0.02)",
              paddingVertical: 10,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            Mô tả sản phẩm
          </Text>
          <Text style={{ paddingHorizontal: 10, marginBottom: 50 }}>
            {item.mota}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 15,
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={showModal}
          style={{
            width: "50%",
            backgroundColor: "green",
            padding: 15,
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/891/891462.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "red",
            padding: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <TouchableWithoutFeedback onPress={showModal}>
          <View style={style.modalContainer}></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            width: "100%",
            height: "40%",
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: 150, height: 150, margin: 10 }}
              source={{ uri: item.image }}
            />

            <View style={{ width: 150 }}>
              <Text
                style={{
                  color: "red",
                  fontSize: 18,
                  bottom: 20,
                  position: "absolute",
                }}
              >
                {item.gia}
              </Text>
            </View>
            <TouchableOpacity onPress={() => showModal()}>
              <Image
                style={{ width: 20, height: 20, margin: 10 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/1828/1828747.png",
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "gray", height: 0.5 }}></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ margin: 25, fontSize: 18 }}>Số lượng:</Text>
            <View
              style={{
                flexDirection: "row",
                margin: 20,
                height: 40,
              }}
            >
              {quantity <= 1 ? (
                <TouchableOpacity
                  disabled={true}
                  onPress={() => decreaseQuantity()}
                  style={{
                    padding: 10,
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
                  onPress={() => decreaseQuantity()}
                  style={{
                    padding: 10,
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
                onChangeText={(txt) => setQuantity(Number(txt))}
                style={{
                  width: 70,
                  textAlign: "center",
                  color: "red",
                  borderWidth: 1,
                }}
                keyboardType="number-pad"
                maxLength={3}
              >
                {quantity}
              </TextInput>
              <TouchableOpacity
                onPress={() => increaseQuantity()}
                style={{
                  padding: 10,
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
          <View style={{ width: "95%", margin: 10 }}>
            <TouchableOpacity
              onPress={() => addToCart()}
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: "red",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white" }}>Thêm vào giỏ hàng </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  thongtin: {
    height: "65%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "relative",
    top: -30,
    backgroundColor: "white",
  },
  viewsp: { margin: 10, paddingHorizontal: 10 },
  tensp: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewgia: {
    paddingHorizontal: 10,
    margin: 10,
  },
  btn: {
    padding: 15,
    backgroundColor: "red",
    width: "50%",
    position: "absolute",
    bottom: 22,
    right: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  btn1: {
    padding: 15,
    backgroundColor: "red",
    width: "30%",
    position: "absolute",
    bottom: 22,
    left: 0,
    borderRadius: 30,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
});
export default Chitiet;
