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
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation<any>()
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  // console.warn(value, 'check value')
  const register = async (username, email, password, gender) => {
    try {
      if (!email || !password || !username || !gender) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please enter the missing value',
        });
        return;
      }
  
      const response = await axios.post('https://reminderapss.rianricardo.me/regis', {
        username: username,
        email: email,
        password: password,
        gender: value,       
      }).then((res) => {                            
        if (res?.data?.Respone != 0) {
          Toast.show({
            type: 'success',
            text1: `Welcome To Remind Everything`,
            text2: "to our user-friendly reminder app!"
          });
        
          // to make sure you can't go back to the login screen when already logged in
          nav.navigate('Login');
        
        } else{          
          
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: '',
        });
      }
      });
 
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred during login',
      });
      console.warn(error);
    }
  };

  return (
    <Div flex={1} bg={COLOR_PRIMARY}>
      <Div
        m={heightPercentageToDP(2)}
        mt={heightPercentageToDP(30)}
        mb={heightPercentageToDP(5)}
      >
        <Text fontSize={Responsive(24)} fontWeight="bold">
          Sign Up
        </Text>
        <Text mt={heightPercentageToDP(1)}>
          Sign up for our reminder app and take control of your schedule. Never
          forget important tasks again with our intuitive and efficient
          platform.
        </Text>
      </Div>
      <ScrollDiv
        flex={1}
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
              Username:
            </Text>
            <Input
              mt={heightPercentageToDP(1)}
              placeholder="Username here...."
              value={username}
              onChangeText={(val) => setUsername(val)}
              w={widthPercentageToDP(87)}
            />
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
            <Text fontWeight="bold" fontSize={Responsive(18)}>
              Gender:
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
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
          onPress={() => register(username, email, password, value)}
        >
          Sign Up
        </Button>
      </ScrollDiv>
    </Div>
  );
};

export default Register;
