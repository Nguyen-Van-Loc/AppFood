import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,TouchableWithoutFeedback,TextInput,Button,
  Alert,Modal} from "react-native";
import { Api_Foodgy, Api_Loai } from "../../api";
import SelectDropdown from "react-native-select-dropdown";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Sanpham = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [loai1, setLoai1] = useState("");
  const [check, setCheck] = useState("");
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [gia, setGia] = useState("");
  const [mota, setMota] = useState("");
  const [daban, setDaban] = useState("");
  const [loai, setLoai] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [list, setList] = useState([]);
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
   const showModal1 = () => {
     setModalVisible1(!modalVisible1);
   };
  const getList = () => {
    fetch(Api_Foodgy)
      .then((res) => res.json())
      .then((data) => setList(data));
  };
  const Update = () => {
    const New = {
      image: link,
      title: title,
      gia: gia,
      mota: mota,
      daban: daban,
      loai: loai,
    };
    fetch(Api_Foodgy + "/" + id, {
      method: "PUT",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(New),
    }).then(() => getList(), setModalVisible(!modalVisible));
  };
  const Add = () => {
    const New = {
      image: link,
      title: title,
      gia: gia,
      mota: mota,
      daban: daban,
      loai: loai,
    };
    fetch(Api_Foodgy, {
      method: "POST",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(New),
    }).then(() => getList(), setModalVisible1(!modalVisible1));
     fetch(Api_All, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(check),
          });
  };
  const showModal = (item) => {
   setID(item.id);
   setTitle(item.title);
   setGia(item.gia);
   setLink(item.image);
   setDaban(item.daban);
   setMota(item.mota);
   setLoai(item.loai);
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    Loai();
    getIduser();
    getList();
  }, [isFocused]);
  const GetId = (id) => {
    fetch(Api_Foodgy + "/" + id)
      .then((res) => res.json())
      .then((data) => navigation.navigate("Chitiet1", { Data: data }));
  };
  return (
    <>
      {check.username == "Admin" ? (
        <View>
          <TouchableOpacity onPress={showModal1}>
            <Image
              style={{ width: 40, height: 40, marginTop: 30 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/9035/9035011.png",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      ) : null}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        numColumns={2}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={style.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.container}
            activeOpacity={1}
            onPress={() => GetId(item.id)}
          >
            <View style={style.item}>
              {check.username == "Admin" ? (
                <View style={{ zIndex: 1 }}>
                  <View style={{ position: "absolute", zIndex: 1, top: 20 }}>
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
                      top: 10,
                      right: 15,
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
                              fetch(Api_Foodgy + "/" + item.id, {
                                method: "DELETE",
                                headers: {
                                  "Content-TyPe": "application/json",
                                  Accept: "application/json",
                                },
                              }).then((res) => getList());
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
              <View style={style.yeuthich}>
                <Text style={{ color: "white" }}>{item.muc}</Text>
              </View>
              <View>
                <Image style={style.image} source={{ uri: item.image }} />
              </View>
            </View>
            <View>
              <Text style={style.text}>{item.title}</Text>
            </View>
            <View style={{ margin: 18 }}></View>
            <View style={{ position: "absolute", left: 1, bottom: 0 }}>
              <Text style={style.textPrice}>{item.gia}</Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 0,
                marginBottom: 5,
                marginRight: -3,
              }}
            >
              <Text style={{ fontSize: 12 }}>
                Đã bán:
                <Text>{item.daban}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal animationType="slide" transparent visible={modalVisible}>
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
            <View>
              <TextInput
                defaultValue={mota}
                editable
                multiline
                onChangeText={(txt) => setMota(txt)}
                placeholder="Mo ta "
                style={{
                  borderWidth: 1,
                  margin: 10,
                }}
              />
            </View>
            <TextInput
              defaultValue={gia}
              onChangeText={(txt) => setGia(txt)}
              placeholder="Giá "
              style={{
                borderWidth: 1,
                paddingHorizontal: 20,
                margin: 10,
              }}
            />
            <TextInput
              onChangeText={(txt) => setDaban(txt)}
              defaultValue={daban}
              placeholder="Đã bán "
              style={{
                borderWidth: 1,
                paddingHorizontal: 20,
                margin: 10,
              }}
            />
            <SelectDropdown
              buttonStyle={style.row1}
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
          <View style={style.modalContainer}>
            <View
              style={{
                padding: 20,
                width: "90%",
                paddingHorizontal: 30,
                backgroundColor: "white",
              }}
            >
              <Text style={{ fontSize: 19 }}> Thêm sản phẩm</Text>
              <View style={{ alignSelf: "flex-start" }}>
                <View style={{ borderWidth: 1, margin: 10 }}>
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
                  placeholder="Link ảnh"
                  onChangeText={(txt) => setLink(txt)}
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    margin: 10,
                  }}
                />
                <View>
                  <TextInput
                    defaultValue={mota}
                    editable
                    multiline
                    onChangeText={(txt) => setMota(txt)}
                    placeholder="Mô tả"
                    style={{
                      borderWidth: 1,
                      margin: 10,
                      paddingHorizontal: 20,
                    }}
                  />
                </View>
                <TextInput
                  defaultValue={gia}
                  onChangeText={(txt) => setGia(txt)}
                  placeholder="GIá "
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    margin: 10,
                  }}
                />
                <TextInput
                  onChangeText={(txt) => setDaban(txt)}
                  defaultValue={daban}
                  placeholder=" Đã bán "
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    margin: 10,
                  }}
                />
                <SelectDropdown
                  buttonStyle={style.row1}
                  defaultButtonText={loai}
                  data={loai1}
                  onSelect={(item) => {
                    setLoai(item);
                  }}
                />
              </View>
              <Button title="Thêm" onPress={() => Add()} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
const style = StyleSheet.create({
  container: {
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  row1: {
    width: "90%",
    margin: 10,
  },
});
export default Sanpham;
