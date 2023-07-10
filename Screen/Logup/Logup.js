import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Api_User } from "../../api";
import { useIsFocused } from "@react-navigation/native";
const Logup = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckPass, setCheckPass] = useState(true);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRePass] = useState("");
  const [name, setName] = useState("");
  const [erruser, setErrUser] = useState("");
  const [errpass, setErrPass] = useState("");
  const [errrepass, setErrRePass] = useState("");
  const [errname, setErrName] = useState("");
  const isFocused = useIsFocused();
  const onSave = () => {
    const newObij = {
      username: user,
      password: pass,
      name: name,
      diachi:'',
      sodt:'',
      sodu:'',
      email:''
    };

    if (user.length == 0) {
      return setErrUser("Tên tài khoản không được để trống");
    } else {
      setErrUser("");
    }
    if (name.length == 0) {
      return setErrName("Tên không được để trống");
    } else {
      setErrName("");
    }
    if (pass.length == 0) {
      return setErrPass("Mật khẩu không được để trống");
    } else {
      setErrPass("");
    }
    if (repass.length == 0) {
      return setErrRePass("Nhập lại mật khẩu không được để trống");
    } else if (repass.toString() != pass.toString()) {
      return setErrRePass("Nhập lại mật khẩu không trùng khớp");
    } else {
      setErrRePass("");
    }
    fetch(Api_User + "?username=" + user)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.length == 1) {
            return setErrUser("Tên tài khoản đã tồn tại");
          } else {
            fetch(Api_User, {
              method: "POST",
              body: JSON.stringify(newObij),
              headers: {
                "Content-TyPe": "application/json",
                Accept: "application/json",
              },
            }).then((data) => showModal());
          }
        },
      );
  }
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 2000);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", marginTop: 33, marginLeft: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 30, height: 20, marginTop: 5 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/130/130882.png",
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Quay lại</Text>
      </View>
      <View style={styles.container}>
        <Image
          style={styles.imageLogo}
          source={{ uri: "https://i.imgur.com/gQ2Ss33.png" }}
        />
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Đăng Ký</Text>
        <View style={styles.viewInput}>
          <Image
            style={styles.imageInput}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/7246/7246434.png",
            }}
          />
          <TextInput
            value={user}
            onChangeText={(txt) => {
              setUser(txt);
            }}
            style={styles.textInput}
            placeholder="Tài Khoản"
          ></TextInput>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{ color: "red", fontSize: 15, margin: 5, marginLeft: 40 }}
          >
            {erruser}
          </Text>
        </View>
        <View style={styles.viewInput}>
          <Image
            style={styles.imageInput}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6089/6089035.png",
            }}
          />
          <TextInput
            value={name}
            onChangeText={(txt) => setName(txt)}
            style={styles.textInput}
            placeholder="Họ và tên"
          ></TextInput>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{ color: "red", fontSize: 15, margin: 5, marginLeft: 40 }}
          >
            {errname}
          </Text>
        </View>
        <View style={styles.viewInput}>
          <Image
            style={styles.imageInput}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/7603/7603257.png",
            }}
          />
          <TextInput
            secureTextEntry={isCheckPass}
            value={pass}
            onChangeText={(txt) => {
              setPass(txt);
            }}
            style={styles.textInput}
            placeholder="Mật Khẩu"
          />
          <TouchableOpacity onPress={() => setCheckPass(!isCheckPass)}>
            <Image
              style={{ width: 30, height: 20, marginTop: 13, marginLeft: 10 }}
              source={
                isCheckPass
                  ? require("../../assets/hide.png")
                  : require("../../assets/view.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{ color: "red", fontSize: 15, margin: 5, marginLeft: 40 }}
          >
            {errpass}
          </Text>
        </View>
        <View style={styles.viewInput}>
          <Image
            style={styles.imageInput}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/7603/7603257.png",
            }}
          />
          <TextInput
            value={repass}
            onChangeText={(txt) => {
              setRePass(txt);
            }}
            secureTextEntry={isCheckPass}
            style={styles.textInput}
            placeholder="Nhập lại mật khẩu"
          />
          <TouchableOpacity onPress={() => setCheckPass(!isCheckPass)}>
            <Image
              style={{ width: 30, height: 20, marginTop: 13, marginLeft: 10 }}
              source={
                isCheckPass
                  ? require("../../assets/hide.png")
                  : require("../../assets/view.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{ color: "red", fontSize: 15, margin: 5, marginLeft: 40 }}
          >
            {errrepass}
          </Text>
        </View>
        <Modal
          animationType="slide"
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
              <Text>Đăng ký thành công !</Text>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.btnstyle} onPress={() => onSave()}>
          <Text style={{ color: "white" }}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textInput: {
    width: "65%",
    fontSize: 15,
    marginLeft: 10,
  },
  viewInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  imageInput: {
    margin: 3,
    width: 40,
    height: 40,
  },
  imageLogo: {
    width: 350,
    height: 200,
  },
  btnstyle: {
    margin: 10,
    height: 50,
    width: 300,
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "red",
    shadowColor: "gray",
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
export default Logup;
