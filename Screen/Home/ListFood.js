import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Api_Foodgy, Api_List, Api_Loai } from "../../api";
import { useIsFocused,useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const food = ["Bánh", "Mỳ", "Nước Ngọt", "Phở", "Gà rán", "Tôm chiên"];
const ListFood = () => {
  const navigation = useNavigation();
  const [check, setCheck] = useState("");
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loai, setLoai] = useState("");
  const [loai1, setLoai1] = useState("");
  const [list, setList] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [existingItems, setExistingItems] = useState([
    "Bánh",
    "Mỳ",
    "Nước Ngọt",
    "Phở",
    "Gà rán",
    "Tôm chiên",
  ]);

  const Loai = () => {
    fetch(Api_Loai + "/" + 1)
      .then((res) => res.json())
      .then((data) => setLoai1(data.item));
  };
  const getIduser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setCheck(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const showModal = (item) => {
    setID(item.id);
    setTitle(item.title);
    setLink(item.image);
    setLoai(item.loai);
    setModalVisible(!modalVisible);
  };
  const Update = () => {
    const New = {
      image: link,
      title: title,
      loai: loai,
    };
    fetch(Api_List + "/" + id, {
      method: "PUT",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(New),
    }).then(() => GetList(), setModalVisible(!modalVisible));
  };
  const Add = () => {
    const New = {
      image: link,
      title: title,
      loai: loai,
    };
    const updatedItems = [...existingItems, loai];
    fetch(Api_Loai + "/" + 1, {
      method: "PUT",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ item: updatedItems }),
    });
    fetch(Api_List, {
      method: "POST",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(New),
    }).then(() => GetList(), setModalVisible1(!modalVisible1));
  };
  const GetList = () => {
    fetch(Api_List)
      .then((res) => res.json())
      .then((json) => setList(json));
  };
  const showModal1 = () => {
    setModalVisible1(!modalVisible1);
  };
  useEffect(() => {
    Loai();
    getIduser();
    GetList();
  }, [isFocused]);
  const GetId = (id) => {
    fetch(Api_List + "/" + id)
      .then((res) => res.json())
      .then((data) => navigation.navigate("Danh muc", { Data1: data }));
  };
  return (
    <>
      <View style={style.container}>
        <FlatList
          data={list}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => GetId(item.id)}
              >
                {check.username == "Admin" ? (
                  <View style={{ zIndex: 1 }}>
                    <View style={{ position: "absolute" }}>
                      <TouchableOpacity onPress={() => showModal(item)}>
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "white",
                          }}
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/128/4130/4130988.png",
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        top: 50,
                        right: 0,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert("Bạn chắc chắn muốn xóa không", "", [
                            {
                              text: "Hủy",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Đồng ý",
                              onPress: () => {
                                fetch(Api_List + "/" + item.id, {
                                  method: "DELETE",
                                  headers: {
                                    "Content-TyPe": "application/json",
                                    Accept: "application/json",
                                  },
                                }).then((res) => GetList());
                              },
                            },
                          ])
                        }
                      >
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "white",
                          }}
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/128/6861/6861362.png",
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                <Image
                  style={{ height: 60, width: 60, margin: 10 }}
                  source={{ uri: item.image }}
                />
                <Text style={{ textAlign: "center", fontSize: 15 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <Modal animationType="fade" transparent visible={modalVisible}>
                <TouchableWithoutFeedback onPress={showModal}>
                  <View style={style.modalContainer}></View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 19 }}> Sửa sản phẩm</Text>
                  <View style={{ alignSelf: "flex-start" }}>
                    <View style={{ width: 340, borderWidth: 1, margin: 10 }}>
                      <TextInput
                        defaultValue={title}
                        placeholder="Tên sản phẩm"
                        style={{
                          paddingHorizontal: 20,
                        }}
                        onChangeText={(txt) => setTitle(txt)}
                      />
                    </View>
                    <TextInput
                      defaultValue={link}
                      placeholder="Link anh"
                      onChangeText={(txt) => setLink(txt)}
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        margin: 10,
                      }}
                    />
                    <SelectDropdown
                      buttonStyle={style.row}
                      defaultButtonText={loai}
                      data={loai1}
                      onSelect={(item) => {
                        setLoai(item);
                      }}
                    />
                  </View>
                  <Button title="Sửa" onPress={() => Update()} />
                </View>
              </Modal>
              <Modal animationType="fade" transparent visible={modalVisible1}>
                <TouchableWithoutFeedback onPress={showModal1}>
                  <View style={style.modalContainer}></View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    justifyContent: "center",
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 19 }}> Thêm sản phẩm</Text>
                  <View style={{ alignSelf: "flex-start" }}>
                    <View style={{ width: 340, borderWidth: 1, margin: 10 }}>
                      <TextInput
                        defaultValue={title}
                        placeholder="Tên sản phẩm"
                        style={{
                          paddingHorizontal: 20,
                        }}
                        onChangeText={(txt) => setTitle(txt)}
                      />
                    </View>
                    <TextInput
                      defaultValue={link}
                      placeholder="Link anh"
                      onChangeText={(txt) => setLink(txt)}
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        margin: 10,
                      }}
                    />
                    <TextInput
                      defaultValue={loai}
                      placeholder="Loai san pham"
                      onChangeText={(txt) => setLoai(txt)}
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        margin: 10,
                      }}
                    />
                  </View>
                  <Button
                    title="Thêm"
                    onPress={() => {
                      Add(), addFood();
                    }}
                  />
                </View>
              </Modal>
            </View>
          )}
        />
        {check.username == "Admin" ? (
          <View>
            <TouchableOpacity onPress={showModal1}>
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/9035/9035011.png",
                }}
              ></Image>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    width: "90%",
    margin: 10,
  },
});

export default ListFood;
