import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  BackHandler,
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { Api_User } from "../../api";
const widthScreen = Dimensions.get("window").width;
const HeightScreen = Dimensions.get("window").height;
const Taikhoan = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const [item1, setItem] = useState([]);
  const [data1, setData] = useState([]);
  const [name, setName] = useState("");
  const [diachi, setDiachi] = useState("");
  const [sodt, setSodt] = useState("");
  const [email, setEmail] = useState("");
  const [sodu, setSodu] = useState("");

  const getId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setItem(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const onUpdate = () => {
    const update = {
      id: item1.id,
      username: item1.username,
      password: item1.password,
      name: name,
      diachi: diachi,
      sodt: sodt,
      email: email,
      sodu: sodu,
    };
    fetch(Api_User + "/" + item1.id, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
    }).then(async (data) => {
      await AsyncStorage.setItem("nit", JSON.stringify(update));
      getData();
      setModalVisible(!modalVisible);
    });
  };
  const getData = () => {
    fetch(Api_User + "/?id=" + item1.id)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    if (item1) {
      setName(item1.name);
      setEmail(item1.email);
      setDiachi(item1.diachi);
      setSodt(item1.sodt);
      setSodu(item1.sodu);
    }
    getData();
    getId();
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
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          zIndex: 1,
          marginLeft: 20,
          marginTop: 35,
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
      <FlatList
        data={data1}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <>
            <View style={style.container}>
              <View style={{ paddingHorizontal: 15 }}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    height: 470,
                    shadowRadius: 1,
                  }}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <View
                      style={{
                        backgroundColor: "orange",
                        width: "100%",
                        height: 100,
                      }}
                    />
                    <View style={{ position: "absolute", bottom: -40 }}>
                      <Image
                        style={{ height: 80, width: 80 }}
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/256/4825/4825038.png",
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ alignItems: "center", marginTop: 50 }}>
                    <Text style={{ fontSize: 24 }}>{item.name}</Text>
                  </View>
                  <View style={{ marginTop: 30, paddingHorizontal: 15 }}>
                    <View style={style.view}>
                      <Text style={style.text}>Email:</Text>
                      <Text style={style.text1}>{item.email}</Text>
                    </View>
                    <View style={style.view}>
                      <Text style={style.text}>Số điện thoại:</Text>
                      <Text style={style.text1}>{item.sodt}</Text>
                    </View>
                    <View style={style.view}>
                      <Text style={style.text}>Địa chỉ:</Text>
                      <Text style={style.text1}>{item.diachi}</Text>
                    </View>
                    <View style={style.view}>
                      <Text style={style.text}>Số dư:</Text>
                      <Text style={style.text1}>{item.sodu}</Text>
                    </View>
                  </View>
                </View>
                <View style={style.viewbtn}>
                  <TouchableOpacity
                    style={style.btn}
                    onPress={() => showModal()}
                  >
                    <Text style={{ color: "white" }}>Sửa thông tin </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#9DCF40",
                    width: "50%",
                    height: 50,
                    borderTopEndRadius: 100,
                    marginRight: 30,
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    backgroundColor: "#60DBC1",
                    width: "50%",
                    height: 50,
                    borderTopStartRadius: 100,
                  }}
                ></View>
              </View>
              <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => {}}
              >
                <View style={style.centeredView}>
                  <View style={style.modalView}>
                    <Text style={{ fontSize: 28, marginBottom: 30 }}>
                      Sửa thông tin
                    </Text>
                    <View style={style.viewModal}>
                      <Text>Tên người dùng:</Text>
                      <TextInput
                        defaultValue={name}
                        onChangeText={(txt) => setName(txt)}
                        style={{ width: "100%", borderWidth: 1, height: 30 }}
                      ></TextInput>
                    </View>
                    <View style={style.viewModal}>
                      <Text>Email:</Text>
                      <TextInput
                        defaultValue={email}
                        onChangeText={(txt) => setEmail(txt)}
                        style={{ width: "100%", borderWidth: 1, height: 30 }}
                      ></TextInput>
                    </View>
                    <View style={style.viewModal}>
                      <Text>Số điện thoại:</Text>
                      <TextInput
                        defaultValue={sodt}
                        onChangeText={(txt) => setSodt(txt)}
                        style={{ width: "100%", borderWidth: 1, height: 30 }}
                      ></TextInput>
                    </View>
                    <View style={style.viewModal}>
                      <Text>Địa Chỉ:</Text>
                      <TextInput
                        defaultValue={diachi}
                        onChangeText={(txt) => setDiachi(txt)}
                        style={{ width: "100%", borderWidth: 1, height: 30 }}
                      ></TextInput>
                    </View>
                    <View style={style.viewModal}>
                      <Text>Số dư:</Text>
                      <TextInput
                        defaultValue={sodu}
                        onChangeText={(txt) => setSodu(txt)}
                        style={{ width: "100%", borderWidth: 1, height: 30 }}
                      ></TextInput>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{
                          width: 90,
                          height: 40,
                          backgroundColor: "red",
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "white" }}>Hủy</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 90,
                          height: 40,
                          backgroundColor: "red",
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => onUpdate()}
                      >
                        <Text style={{ color: "white" }}>Lưu</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        )}
      />
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    height: HeightScreen,
    width: widthScreen,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    paddingVertical: 15,
  },
  text1: { fontSize: 15, paddingVertical: 20 },
  view: {
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewbtn: {
    width: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewModal: {
    marginVertical: 5,
  },
});
export default Taikhoan;
