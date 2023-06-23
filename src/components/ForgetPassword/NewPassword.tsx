import React, { useState } from "react";
import { Button, Div, Icon, Input, ScrollDiv, Text } from "react-native-magnus";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { COLOR_PRIMARY } from "../../helper/theme";
import { Responsive } from "../../helper/Responsive";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const route = useRoute();
  const params = route?.params;
  const nav = useNavigation<any>();

  const changePassword = async (password) => {
    try {
      if (!password) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter password",
        });
        return;
      }

      const response = await axios
        .post("https://reminderapss.rianricardo.me/newpass", {
          email: params?.sendEmail,
          password: password,
        })
        .then((res) => {
          if (res?.data?.Respone != 0) {
            Toast.show({
              type: "success",
              text1: "Berhasil Ganti Password",
              text2: "Selamat Datang kembali di Remind Everything",
            });

            // to make sure you can't go back to the login screen when already logged in
            nav.navigate("Login");
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Email or Password Wrong",
            });
          }
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred during login",
      });
      console.warn(error);
    }
  };
  return (
    <Div flex={1} bg={COLOR_PRIMARY}>
      <Div
        m={heightPercentageToDP(2)}
        mt={heightPercentageToDP(40)}
        mb={heightPercentageToDP(5)}
      >
        <Text fontSize={Responsive(24)} fontWeight="bold">
          New Password
        </Text>
        <Text mt={heightPercentageToDP(1)}>
          Set a new password for your reminder app account effortlessly. Secure
          your data and regain control of your schedule in no time.
        </Text>
      </Div>
      <ScrollDiv
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        h={heightPercentageToDP(100)}
        bg={"#fff"}
        roundedTopLeft={Responsive(50)}
        roundedTopRight={Responsive(50)}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Div
            mt={heightPercentageToDP(3)}
            ml={heightPercentageToDP(3)}
            mr={heightPercentageToDP(3)}
          >
            <Text fontWeight="bold" fontSize={Responsive(18)}>
              New Password:
            </Text>
            <Input
              mt={heightPercentageToDP(1)}
              placeholder="Password here...."
              value={password}
              onChangeText={(val) => setPassword(val)}
              keyboardType="visible-password"
              w={widthPercentageToDP(87)}
              secureTextEntry={!isPasswordVisible}
              suffix={
                <TouchableOpacity
                  style={{ right: 5 }}
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Icon
                    name={isPasswordVisible ? "eye" : "eye-with-line"}
                    fontSize={16}
                    color="black"
                    fontFamily="Entypo"
                  />
                </TouchableOpacity>
              }
            />
          </Div>
        </KeyboardAvoidingView>
        <Button
          w={widthPercentageToDP(87)}
          m={heightPercentageToDP(3)}
          color="#fff"
          bg="#000"
          fontSize={Responsive(16)}
          fontWeight="500"
          rounded={16}
          onPress={() => changePassword(password)}
        >
          Submit
        </Button>
      </ScrollDiv>
    </Div>
  );
};

export default NewPassword;
