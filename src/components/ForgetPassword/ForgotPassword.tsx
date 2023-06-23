import React, { useState } from "react";
import { Button, Div, Input, ScrollDiv, Text } from "react-native-magnus";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { COLOR_PRIMARY } from "../../helper/theme";
import { Responsive } from "../../helper/Responsive";
import { KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const nav = useNavigation<any>();
  const forgetPassword = async (email: any) => {
    try {
      if (!email) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter email",
        });
        return;
      }

      const response = await axios
        .post("https://reminderapss.rianricardo.me/cekemail", {
          email: email,
        })
        .then((res) => {
          if (res?.data?.Respone != 0) {
            Toast.show({
              type: "success",
              text1: "Email terdaftar",
            });

            // to make sure you can't go back to the login screen when already logged in
            nav.navigate("NewPass", {
              sendEmail: email,
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Email tidak terdaftar",
            });
          }
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred during forget password",
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
          Forget Password
        </Text>
        <Text mt={heightPercentageToDP(1)}>
          Forgot your password? No worries! Easily reset it and regain access to
          your reminders with just a few simple steps.
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
              Email:
            </Text>
            <Input
              mt={heightPercentageToDP(1)}
              placeholder="Email here...."
              value={email}
              onChangeText={(val) => setEmail(val)}
              keyboardType="email-address"
              w={widthPercentageToDP(87)}
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
          onPress={() => forgetPassword(email)}
        >
          Submit
        </Button>
      </ScrollDiv>
    </Div>
  );
};

export default ForgotPassword;
