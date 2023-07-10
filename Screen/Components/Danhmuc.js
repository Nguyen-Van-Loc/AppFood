import React from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'

const Danhmuc = ({title}) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{ marginTop: 16, flexDirection: "row" }}
        >
          <Text>{title}</Text>
          <Image
            style={{ width: 20, height: 20 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/2989/2989988.png",
            }}
          />
        </TouchableOpacity>
      </View>
    );
}

export default Danhmuc;