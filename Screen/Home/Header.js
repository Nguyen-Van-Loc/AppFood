import { useEffect, useState } from "react";
import { Api_Image, Api_Loai } from "../../api";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { useIsFocused, useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const Header = () => {
  const getIduser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setCheck(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const navigation = useNavigation();
  const [loai1, setLoai1] = useState("");
  const isFocused = useIsFocused();
  const [check, setCheck] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [gia, setGia] = useState("");
  const [mota, setMota] = useState("");
  const [daban, setDaban] = useState("");
  const [loai, setLoai] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const Loai = () => {
    fetch(Api_Loai + "/" + 1)
      .then((res) => res.json())
      .then((data) => setLoai1(data.item));
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

    fetch(Api_Image + "/" + edit, {
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
    fetch(Api_Image, {
      method: "POST",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(New),
    }).then(() => getList(), setModalVisible1(!modalVisible1));
  };

  const showModal = (item) => {
    setEdit(item.id);
    setTitle(item.title);
    setGia(item.gia);
    setLink(item.image);
    setDaban(item.daban);
    setMota(item.mota);
    setLoai(item.loai);
    setModalVisible(!modalVisible);
  };
  const showModal1 = () => {
    setModalVisible1(!modalVisible1);
  };
  const getList = () => {
    fetch(Api_Image)
      .then((res) => res.json())
      .then((json) => setList(json));
  };
  const GetId = (id) => {
    fetch(Api_Image + "/" + id)
      .then((res) => res.json())
      .then((data) => navigation.navigate("Chitiet1", { Data: data }));
  };
  useEffect(() => {
    Loai();
    setLoading(false);
    getList();
    getIduser();
  }, [isFocused]);
  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center" }}
        />
      ) : (
        <View style={style.container}>
          <FlatList
            data={list}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => GetId(item.id)} activeOpacity={0.9}>
                {check.username == "Admin" ? (
                  <View style={{ zIndex: 1 }}>
                    <View style={{ position: "absolute", zIndex: 1, top: 10 }}>
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
                                fetch(Api_Image + "/" + item.id, {
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

                <Image style={style.styleImage} source={{ uri: item.image }} />
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
                  placeholder="Gia "
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 20,
                    margin: 10,
                  }}
                />
                <TextInput
                  onChangeText={(txt) => setDaban(txt)}
                  defaultValue={daban}
                  placeholder="Gia "
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
                      buttonStyle={style.row}
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
      )}
    </>
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

export default Header;
