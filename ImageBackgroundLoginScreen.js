import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IMAGE } from "./src/constants/image";
import CustomButton from "./src/custom/CustomButton";
import CustomTextInput from "./src/custom/CustomTextInput";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Image blurRadius={1} source={IMAGE.SLIDE1} />
      </View>
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            borderRadius: 12,
            margin: 10,
            fontSize: 20,
          }}
        >
          Login Here
        </Text>
        <CustomTextInput placeholder="Name" />
        <CustomTextInput placeholder="Email" />
        <CustomTextInput placeholder="Password" />
        <CustomButton label="Log in" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
