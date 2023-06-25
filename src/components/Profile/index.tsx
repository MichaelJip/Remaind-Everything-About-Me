import React, { useState } from "react";
import { Button, Div, Icon, Input, Text } from "react-native-magnus";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import HeadlessDatePicker from "../DatePicker/HeadlessDatePicker";
import PickerButtonDesign from "../DatePicker/PickerButtonDesign";
import { formatDate } from "../../helper/formatDate";
import { useRoute, useNavigation } from "@react-navigation/native";
import moment from "moment";
import Toast from "react-native-toast-message";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditProfile = () => {
  const nav = useNavigation<any>()
  const route = useRoute<any>();
  const params = route?.params;
  const [email, setEmail] = useState(params?.email)
  const [password, setPassword] = useState(params?.password)
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  console.log(params, "console dalam edit profile");  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  
  const updateProfile = async (
    email,
    selectedDate,
  ) => {
    try {
      if (
        !email ||        
        !selectedDate         
      ) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter the missing value",
        });
        return;
      }

      const response = await axios
        .post("https://reminderapss.rianricardo.me/editprofile", {
          username: params?.name,   
          email: email,       
          password: password,
          gender: params?.gender,
          dob: moment(selectedDate).format(),          
        })
        .then((res) => {                    
            if (res?.data?.Respone != 0) {
              Toast.show({
                type: "success",
                text1: `Profile have been updated`,
              });
              nav.navigate("Settings")
            } else{

            Toast.show({
              type: 'error',
              text1: 'Error',
            });
          }
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred during update profile",
      });
      console.log(error);
    }
  };
  return (
    <Div flex={1} bg="#fff">
      <Div p={10} row>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Name:
        </Text>
        <Text
          ml={widthPercentageToDP(2)}
          fontSize={Responsive(20)}
          color="#000"
        >
          {params?.name}
        </Text>
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          DOB:
        </Text>
        {/* <Text ml={widthPercentageToDP(2)} fontSize={Responsive(20)} color="#000" >
          {params?.dob}
        </Text> */}
        <HeadlessDatePicker
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
        >
          <PickerButtonDesign
            title="Date Of Birth"            
            value={params?.dob ? formatDate(selectedDate) : moment(params?.dob).format('YYYY-MM-DD') }
          />
        </HeadlessDatePicker>
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Email:
        </Text>
        {/* <Text
          ml={widthPercentageToDP(2)}
          fontSize={Responsive(20)}
          color="#000"
        >
          {params?.email}
        </Text> */}
        <Input
          placeholder="email...."
          value={email}
          onChangeText={(val) => setEmail(val)}
          mt={heightPercentageToDP(0.5)}
        />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Password:
        </Text>       
        <Input
              mt={heightPercentageToDP(1)}
              placeholder="Password here...."
              value={password}
              onChangeText={(val) => setPassword(val)}
              // w={widthPercentageToDP(87)}
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

      <Div p={10} row>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Gender:
        </Text>
        <Text
          ml={widthPercentageToDP(2)}
          fontSize={Responsive(20)}
          color="#000"
        >
          {params?.gender}
        </Text>
        {/* <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        /> */}
      </Div>

      <Button
        w={widthPercentageToDP(95)}
        ml={widthPercentageToDP(3)}
        mr={widthPercentageToDP(3)}
        bg="#000"
        color="#fff"
        fontWeight="bold"
        onPress={() => updateProfile(email,password) }
      >
        Simpan
      </Button>
    </Div>
  );
};

export default EditProfile;
