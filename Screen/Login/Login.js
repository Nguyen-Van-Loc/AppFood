import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
const WithScreen = Dimensions.get("window").width;
const HeigtScreen = Dimensions.get("window").height;
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
  Dimensions,
} from "react-native";
const Login =  ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckPass, setCheckPass] = useState(true);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erruser, setErrUser] = useState("");
  const [errpass, setErrPass] = useState("");
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("Home356");
      setUser("");
      setPass("");
    }, 2000);
  };
  const onLogin = () => {
    if (user.length == 0) {
      return setErrUser("Tên tài khoản không được để trống");
    } else {
      setErrUser("");
    }
    if (pass.length == 0) {
      return setErrPass("Mật khẩu không được để trống");
    } else {
      setErrPass("");
    }
    fetch("http://192.168.0.108:3000/user?username=" + user)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.length != 1) {
          return setErrUser("Tên tài khoản không đúng");
        } else {
          let checkPass = data[0];
          if (checkPass.password != pass) {
            setErrPass("Mật khẩu không đúng");
          } else {
            try {
              await AsyncStorage.setItem("nit", JSON.stringify(checkPass));
              showModal();
            } catch (e) {
              console.log(e);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.imageLogo}
            source={{ uri: "https://i.imgur.com/gQ2Ss33.png" }}
          ></Image>
          <View style={styles.viewInput}>
            <Image
              style={styles.imageInput}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/256/7246/7246434.png",
              }}
            />
            <TextInput
              value={user}
              onChangeText={(txt) => setUser(txt)}
              style={styles.textInput}
              placeholder="Tài Khoản"
            ></TextInput>
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={{ color: "red", fontSize: 15, marginLeft: 40 }}>
              {erruser}
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
              value={pass}
              onChangeText={(txt) => setPass(txt)}
              secureTextEntry={isCheckPass}
              style={styles.textInput}
              placeholder="Mật Khẩu"
            ></TextInput>
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
            <Text style={{ color: "red", fontSize: 15, marginLeft: 40 }}>
              {errpass}
            </Text>
          </View>
          <TouchableOpacity style={styles.btnstyle} onPress={() => onLogin()}>
            <Text style={{ color: "white" }}>Đăng Nhập</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text>Bạn chưa có tài khoản ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Logup")}>
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "black",
                width: 300,
              }}
            ></View>
            <Text style={{ margin: 10, fontSize: 15 }}>Or</Text>
            <View
              style={{ flex: 1, height: 1, backgroundColor: "black" }}
            ></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image
                style={{ width: 50, height: 50, margin: 10 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/281/281764.png",
                }}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ width: 50, height: 50, margin: 10 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
                }}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ width: 50, height: 50, margin: 10 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/3670/3670151.png",
                }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 90, height: 90 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/10523/10523714.png",
            }}
          />
          <Image
            style={{ width: 90, height: 90 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/256/6717/6717351.png",
            }}
          />
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator
                size={50}
                style={styles.modalText}
              ></ActivityIndicator>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: WithScreen,
    flex: 1,
    height: HeigtScreen,
  },
  textInput: {
    fontSize: 15,
    marginLeft: 10,
    width: "65%",
  },
  viewInput: {
    margin: 5,
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
    height: 330,
  },
  btnstyle: {
    margin: 10,
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

export default Login;
