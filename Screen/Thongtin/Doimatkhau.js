import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,Modal,ActivityIndicator, ToastAndroid
} from "react-native";
import { Api_User } from "../../api";
import { useNavigation } from "@react-navigation/native";
const Doimatkhau = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckPass, setCheckPass] = useState(true);
  const [data, setData] = useState([]);
  const [pass, setPass] = useState("");
  const [passNew, setPassNew] = useState("");
  const [repass, setRePass] = useState("");
  const [item, setItem] = useState("");
  const [errpass, setErrPass] = useState("");
  const [errpassnew, setErrPassNew] = useState("");
  const [errrepass, setErrRePass] = useState("");
  const navigation = useNavigation();
  const getUser = async () => {
    
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      getUse(JSON.parse(jsonValue));
      return jsonValue != null ? setItem(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };
  const updatePass = () => {
    if (pass.length == 0) {
      return setErrPass("Mật khẩu cũ không được để trống");
    }
    else{setErrPass('')}
    if (pass != data.password) {
      return setErrPass("Mật khẩu cũ không đúng");
    } else {
      setErrPass("");
    }
    if (passNew.length == 0) {
      return setErrPassNew("Mật khẩu mới không được để trống");
    } else {
      setErrPassNew("");
    }
    if (repass.length == 0) {
      return setErrRePass("Nhập lại mật khẩu không được để trống");
    } else {
      setErrRePass("");
    }
    if (repass != passNew) {
      return setErrRePass("Nhập lại mật khẩu không trùng khớp");
    }
    const up = {
      id: item.id,
      username: item.username,
      password: passNew,
      name: data.name,
      diachi: data.diachi,
      sodt: data.sodt,
      email: data.email,
      sodu: data.sodu,
    };
    fetch(Api_User + "/" + item.id, {
      method: "PUT",
      body: JSON.stringify(up),
      headers: {
        "Content-TyPe": "application/json",
        Accept: "application/json",
      },
    }).then(async (data) => {
      await AsyncStorage.setItem("nit", JSON.stringify(up));
      showModal();
    });
  };
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Login')
      ToastAndroid.showWithGravity('Vui lòng đăng nhập lại',ToastAndroid.BOTTOM,ToastAndroid.LONG)
    }, 2000);
  };
  const getUse = (item1) => {
    fetch(Api_User + "/" + item1.id)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: "100%" }}>
        <View
          style={{
            backgroundColor: "red",
            height: "25%",
            borderBottomLeftRadius: 200,
          }}
        />
        <View style={styles.view}>
          <View style={styles.text}>
            <TextInput
              style={{ width: "100%" }}
              defaultValue={pass}
              onChangeText={(txt) => setPass(txt)}
              placeholder="Mật khẩu cũ"
              secureTextEntry={isCheckPass}
            />
          </View>
          <Text style={{ color: "red", fontSize: 15, margin: 5 }}>
            {errpass}
          </Text>
          <View style={styles.text}>
            <TextInput
              style={{ width: "80%" }}
              defaultValue={passNew}
              onChangeText={(txt) => setPassNew(txt)}
              placeholder="Mật khẩu mới"
              secureTextEntry={isCheckPass}
            />
            <TouchableOpacity onPress={() => setCheckPass(!isCheckPass)}>
              <Image
                style={{ width: 30, height: 20, marginTop: 5, marginLeft: 10 }}
                source={
                  isCheckPass
                    ? require("../../assets/hide.png")
                    : require("../../assets/view.png")
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "red", fontSize: 15, margin: 5 }}>
            {errpassnew}
          </Text>
          <View style={styles.text}>
            <TextInput
              style={{ width: "80%" }}
              defaultValue={repass}
              onChangeText={(txt) => setRePass(txt)}
              placeholder="Nhập lại mật khẩu "
              secureTextEntry={isCheckPass}
            />
            <TouchableOpacity onPress={() => setCheckPass(!isCheckPass)}>
              <Image
                style={{ width: 30, height: 20, marginTop: 5, marginLeft: 10 }}
                source={
                  isCheckPass
                    ? require("../../assets/hide.png")
                    : require("../../assets/view.png")
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "red", fontSize: 15, margin: 5 }}>
            {errrepass}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginTop: 10,
                backgroundColor: "red",
                borderRadius: 10,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  marginHorizontal: 30,
                  marginVertical: 15,
                  color: "white",
                }}
              >
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => updatePass()}
              style={{
                marginTop: 10,
                marginRight: 15,
                backgroundColor: "red",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  marginHorizontal: 30,
                  marginVertical: 15,
                  color: "white",
                }}
              >
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator
                size={50}
                style={styles.modalText}
              ></ActivityIndicator>
              <Text>Đổi mật khẩu thành công </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    marginTop: -50,
    zIndex: 1,
    marginHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "white",
    padding: 30,
  },
  text: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Doimatkhau;
