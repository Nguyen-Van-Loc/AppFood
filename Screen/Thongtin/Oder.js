import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Api_Oder } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
const Oder = () => {
  const hienthi = new Intl.NumberFormat("vi-VN");
  const isFocused = useIsFocused();
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [all, setAll] = useState([]);
  const getId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nit");
      getList(JSON.parse(jsonValue));
      return jsonValue != null ? setItem(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log("2" + e);
    }
  };
  const getAll = () => {
    fetch(Api_Oder)
      .then((res) => res.json())
      .then((data) => {
        let allProducts = data.filter((oder) => {
          oder.products.map((order) => {
            setAll(order)
          });
        });
        console.log(all);
      });
  };
  const getList = (item) => {
    fetch(Api_Oder)
      .then((res) => res.json())
      .then((data) => {
        let getOder = data.find((oder) => oder.userId === item.id);
        if (getOder) {
          const products = getOder.products;
          let product = products.filter(
            (product) => product.product.length > 0
          );
          setData(product);
        }
      });
  };
  useEffect(() => {
    getId();
    getAll();
  }, [isFocused]);
  return (
    <>
      {item.username == "Admin" ? (
        <FlatList
          data={all}
          renderItem={({ item }) => (
            <View style={{ flex: 1, width: "100%" }}>
              <View style={{ margin: 10, borderWidth: 1, borderRadius: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 80, height: 80, margin: 5 }}
                    source={{ uri: item.product[0].image }}
                  />
                  <View style={{ width: "70%" }}>
                    <Text style={{ fontSize: 16 }}>
                      {item.product[0].title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderTopWidth: 0.4,
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>Số lượng :</Text>
                      <Text style={{ color: "red", fontSize: 16 }}>
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{ borderTopWidth: 0.7, width: "100%", marginTop: 5 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text>Trạng thái :</Text>
                      <Text style={{ color: "green" }}>{item.trangthai}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Tổng tiền :</Text>
                      <Text style={{ color: "red" }}>
                        ₫ {hienthi.format(item.totalPrice)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ flex: 1, width: "100%" }}>
              <View style={{ margin: 10, borderWidth: 1, borderRadius: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 80, height: 80, margin: 5 }}
                    source={{ uri: item.product[0].image }}
                  />
                  <View style={{ width: "70%" }}>
                    <Text style={{ fontSize: 16 }}>
                      {item.product[0].title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderTopWidth: 0.4,
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>Số lượng :</Text>
                      <Text style={{ color: "red", fontSize: 16 }}>
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{ borderTopWidth: 0.7, width: "100%", marginTop: 5 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text>Trạng thái :</Text>
                      <Text style={{ color: "green" }}>{item.trangthai}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Tổng tiền :</Text>
                      <Text style={{ color: "red" }}>
                        ₫ {hienthi.format(item.totalPrice)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </>
  );
};
export default Oder;
