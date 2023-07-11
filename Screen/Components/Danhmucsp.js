import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  FlatList,Button,Alert,ScrollView
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api_All, Api_sanPham,Api_Loai } from "../../api";
const Danhmucsp = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params.Data1;
  const isFocused = useIsFocused();
   const [loai1, setLoai1] = useState("");
  const [list, setList] = useState([]);
  const [check, setCheck] = useState("");
  const [tensp, setTensp] = useState("");
  const [link, setLinksp] = useState("");
  const [gia, setGiasp] = useState("");
  const [mota, setMotasp] = useState("");
  const [daban, setDaban] = useState("");
  const [loai, setLoaisp] = useState("");
  const [muc, setMucsp] = useState("");
  const [nit, setGetCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const getIduser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      return jsonValue != null ? setCheck(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const Loai = () => {
    fetch(Api_Loai + "/" + 1)
      .then((res) => res.json())
      .then((data) => setLoai1(data.item));
  };
  const getSanPham = () => {
    fetch(Api_sanPham)
      .then((res) => res.json())
      .then((data) => setList(data));
  };
  let getCart = list.find((cart) => cart.ma === item.id);
  if (getCart) {
    const products = getCart.products;
    setList(products);
  }
   const showModal1 = (item) => {
     setTensp(item.title);
     setGiasp(item.gia);
     setLinksp(item.image);
     setDaban(item.daban);
     setMotasp(item.mota);
     setLoaisp(item.loai);
     setMucsp(item.muc)
     setModalVisible1(!modalVisible1);
   };
  const Update = () => {
    const New = {
      image: link,
      title: title,
      gia: gia,
      mota: mota,
      daban: daban,
      loai: loai,
      muc: muc,
    };
    fetch(Api_sanPham + "/" + id, {
      method: "PUT",
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(New),
    }).then(() => getSanPham(), setModalVisible1(!modalVisible1));
  };
  const AddSP = () => {
    fetch(Api_sanPham)
      .then((res) => res.json())
      .then((data) => {
        let check = data.find((sp) => sp.ma === item.id);
        if (check) {
          const product = {
            id: check.products.length + 1,
            title: tensp,
            image: link,
            gia: gia,
            mota: mota,
            daban: daban,
            muc: muc,
          };
          check.products.push(product);
          fetch(Api_sanPham + "/" + item.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(check),
          }).then((res) => getSanPham());
          fetch(Api_All, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(check),
          });
        } else {
          const New = {
            ma: item.id,
            products: [
              {
                id: nit.length + 1,
                title: tensp,
                image: link,
                gia: gia,
                mota: mota,
                daban: daban,
                muc: muc,
              },
            ],
          };
          fetch(Api_sanPham, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(New),
          }).then((res) => getSanPham());
        }
      });
    showModal();
  };
  const showModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    Loai();
    getSanPham();
    getIduser();
  }, [isFocused]);
  const GetId = (itemData) => {
    fetch(Api_sanPham + "/" + itemData.id)
      .then((res) => res.json())
      .then((data) => {
        navigation.navigate("Chitiet1", { Data: itemData });
      });
  };
  return (
    <View style={{ height: "100%" }}>
      {check.username == "Admin" ? (
        <View>
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 10 }}
            onPress={() => showModal()}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/753/753317.png",
              }}
            />
          </TouchableOpacity>
          <Modal animationType="slide" transparent visible={modalVisible}>
            <TouchableWithoutFeedback onPress={showModal}>
              <View style={style.modalContainer}>
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>Thêm Sản Phẩm</Text>
                  </View>
                  <View>
                    <Text>Tên Sản Phẩm</Text>
                    <TextInput
                      defaultValue={tensp}
                      onChangeText={(txt) => setTensp(txt)}
                      placeholder="Tên Sản Phẩm"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View>
                    <Text>Link Ảnh</Text>
                    <TextInput
                      defaultValue={link}
                      onChangeText={(txt) => setLinksp(txt)}
                      placeholder="Link Ảnh"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View>
                    <Text>Giá Sản Phẩm</Text>
                    <TextInput
                      defaultValue={gia}
                      onChangeText={(txt) => setGiasp(txt)}
                      placeholder="Giá Sản Phẩm"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View>
                    <Text>Mô tả</Text>
                    <TextInput
                      defaultValue={mota}
                      onChangeText={(txt) => setMotasp(txt)}
                      editable
                      multiline
                      placeholder="Mô tả"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View>
                    <Text>Đã bán</Text>
                    <TextInput
                      defaultValue={daban}
                      onChangeText={(txt) => setDaban(txt)}
                      placeholder="Đã bán"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View>
                    <Text>Loại</Text>
                    <TextInput
                      defaultValue={loai}
                      onChangeText={(txt) => setLoaisp(txt)}
                      placeholder="Loại"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View>
                    <Text>Mục</Text>
                    <TextInput
                      defaultValue={muc}
                      onChangeText={(txt) => setMucsp(txt)}
                      placeholder="Mục"
                      style={{ borderWidth: 1, padding: 5 }}
                    ></TextInput>
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => AddSP()}
                      style={{
                        backgroundColor: "red",
                        borderRadius: 20,
                        padding: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>Thêm Sản Phẩm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal animationType="fade" transparent visible={modalVisible1}>
            <ScrollView>
              <View
                style={{
                  justifyContent: "center",
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity onPress={showModal1}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/463/463612.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 19 }}> Sửa sản phẩm</Text>
                <View style={{ alignSelf: "flex-start" }}>
                  <View style={{ width: 340, borderWidth: 1, margin: 10 }}>
                    <TextInput
                      defaultValue={tensp}
                      placeholder="Tên sản phẩm"
                      style={{
                        paddingHorizontal: 20,
                      }}
                      onChangeText={(txt) => setTensp(txt)}
                    />
                  </View>
                  <TextInput
                    defaultValue={link}
                    placeholder="Link anh"
                    onChangeText={(txt) => setLinksp(txt)}
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
                      onChangeText={(txt) => setMotasp(txt)}
                      placeholder="Mo ta "
                      style={{
                        borderWidth: 1,
                        margin: 10,
                      }}
                    />
                  </View>
                  <TextInput
                    defaultValue={gia}
                    onChangeText={(txt) => setGiasp(txt)}
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
                      setLoaisp(item);
                    }}
                  />
                  <TextInput
                    onChangeText={(txt) => setMucsp(txt)}
                    defaultValue={muc}
                    placeholder="Mục "
                    style={{
                      borderWidth: 1,
                      paddingHorizontal: 20,
                      margin: 10,
                    }}
                  />
                </View>
                <Button title="Sửa" onPress={() => Update()} />
              </View>
            </ScrollView>
          </Modal>
        </View>
      ) : null}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={style.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.container}
            activeOpacity={1}
            onPress={() => GetId(item)}
          >
            <View style={style.item}>
              {check.username == "Admin" ? (
                <View style={{ zIndex: 1 }}>
                  <View style={{ position: "absolute", zIndex: 1, top: 20 }}>
                    <TouchableOpacity onPress={() => showModal1(item)}>
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
    </View>
  );
};
const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
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
  row1: {
    width: "90%",
    margin: 10,
  },
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 10,
    margin: 5,
    backgroundColor: "white",
  },
});
export default Danhmucsp;
