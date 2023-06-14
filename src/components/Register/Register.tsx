import React, { useState } from "react";
import { Button, Div, Input, ScrollDiv, Text } from "react-native-magnus";
import { COLOR_PRIMARY } from "../../helper/theme";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'm'},
    {label: 'Female', value: 'f'}
  ]);

  return (
    <Div flex={1} bg={COLOR_PRIMARY}>
      <Div
        m={heightPercentageToDP(2)}
        mt={heightPercentageToDP(40)}
        mb={heightPercentageToDP(5)}
      >
        <Text fontSize={Responsive(24)} fontWeight="bold">
          Sign Up
        </Text>
        <Text mt={heightPercentageToDP(1)}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
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
              secureTextEntry
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
        >
          Sign Up
        </Button>
      </ScrollDiv>
    </Div>
  );
};

export default Register;
