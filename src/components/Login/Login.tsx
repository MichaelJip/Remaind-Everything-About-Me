import React, { useState } from "react";
import { Button, Div, Icon, Input, ScrollDiv, Text } from "react-native-magnus";
import { COLOR_PRIMARY } from "../../helper/theme";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommonActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const nav = useNavigation<any>();
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter both email and password",
        });
        return;
      }

      const response = await axios
        .post("https://reminderapss.rianricardo.me/loginnew", {
          email: email,
          password: password,
        })
        .then((res) => {
          const name = res?.data?.result[0]?.username;
          if (res?.data?.Respone != 0) {
            Toast.show({
              type: "success",
              text1: `Welcome ${name}`,
              text2: "Welcome to our user-friendly reminder app!",
            });

            // nav.navigate("Dashboard", {
            //   screen: "MyBot",
            //   params: {
            //     username: name,
            //   },
            // });

            nav.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Dashboard',
                    params: {
                      screen: 'MyBot',
                      params: {
                        username: name,
                      },
                    },
                  },
                ],
              })
            );
            
            // nav.replace("Dashboard", {
            //   screen: "MyBot",
            //   params: {
            //     username: name,
            //   },
            // });
            
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
          Sign In
        </Text>
        <Text mt={heightPercentageToDP(1)}>
          Sign in to our reminder app and unlock a world of organized
          productivity. Stay on top of your tasks with ease and never miss a
          beat.
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
            <Text fontWeight="bold" fontSize={Responsive(18)}>
              Password:
            </Text>
            <Input
              mt={heightPercentageToDP(1)}
              placeholder="Password here...."
              value={password}
              onChangeText={(val) => setPassword(val)}
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => nav.navigate("Forget")}
        >
          <Text
            textAlign="right"
            mr={widthPercentageToDP(7.5)}
            mt={heightPercentageToDP(1)}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
        <Button
          w={widthPercentageToDP(87)}
          m={heightPercentageToDP(3)}
          color="#fff"
          bg="#000"
          fontSize={Responsive(16)}
          fontWeight="500"
          rounded={16}
          onPress={() => login(email, password)}
        >
          Sign In
        </Button>
      </ScrollDiv>
    </Div>
  );
};

export default Login;
