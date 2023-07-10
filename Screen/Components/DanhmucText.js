import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
const DanhmucText = ({title}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
      }}
    >
      <View>
        <Text style={style.styleFont}>{title}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  styleFont: {
    fontSize: 18,
    color: "red",
  },
});

export default DanhmucText;
