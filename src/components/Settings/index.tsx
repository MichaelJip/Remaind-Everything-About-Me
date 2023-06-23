import React, { useEffect, useRef, useState } from "react";
import { Div, Icon, Image, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Pressable } from "react-native";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";

const Settings = ({username}:any) => {
  const name = username
  const [dob,setDob] = useState('') 
  const [email, setEmail] = useState('') 
  const [gender, setGender] = useState('')
  const nav = useNavigation<any>();    
  const [isModalVisible, setModalVisible] = useState(false);
  const fetchData = async () => {
  try {
    const response = await axios.get(`https://reminderapss.rianricardo.me/userprofile/${name}`);
    const data = response.data[0];   
    setDob(data?.dob)
    setEmail(data?.email)
    setGender(data?.gender) 
    console.log(data);
  } catch (error) {
    console.log('There is an error:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);
  const data = [
    {
      title: "Family Vacation",
      category: "Lainnya",
      desc: "A collection of photos from your recent family vacation to the beach. It includes snapshots of your kids building sandcastles, playing in the waves, and enjoying ice cream by the shore.",
    },
    {
      title: "Family Vacation",
      category: "Lainnya",
      desc: "A collection of photos from your recent family vacation to the beach. It includes snapshots of your kids building sandcastles, playing in the waves, and enjoying ice cream by the shore.",
    },
    {
      title: "Family Vacation",
      category: "Lainnya",
      desc: "A collection of photos from your recent family vacation to the beach. It includes snapshots of your kids building sandcastles, playing in the waves, and enjoying ice cream by the shore.",
    },
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const list = ({ item }: any) => {
    return (
      <Div p={10}>
        <Text fontSize={Responsive(20)} fontWeight="500" color="#000">
          {item?.title}
        </Text>
        <Text fontSize={Responsive(18)}>{item?.category}</Text>
        <Text
          w={widthPercentageToDP(80)}
          fontSize={Responsive(12)}
          color="#000"
        >
          {item?.desc}
        </Text>
      </Div>
    );
  };

  return (
    <Div flex={1} bg="#fff">
      <Div
        justifyContent="center"
        alignSelf="center"
        mt={heightPercentageToDP(5)}
      >
        <Text
          textAlign="center"
          mt={heightPercentageToDP(1)}
          fontSize={Responsive(20)}
          fontWeight="500"
        >
          {name}
        </Text>
      </Div>

      <Div mt={heightPercentageToDP(5)}>
        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(4),
          }}
          onPress={() => nav.navigate("Profile", {
            name: name,
            dob: dob,
            email:email,
            gender: gender,
          })}
          activeOpacity={0.7}
        >
          <Div row>
            <Icon
              fontFamily="FontAwesome"
              name="user"
              fontSize={Responsive(24)}
              color="#000"
            />
            <Text
              ml={widthPercentageToDP(2)}
              fontSize={Responsive(16)}
              color="#000"
            >
              Edit Profile
            </Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(2),
          }}
          onPress={toggleModal}
          activeOpacity={0.7}
        >
          <Div row>
            <Icon
              fontFamily="FontAwesome"
              name="file-text"
              fontSize={Responsive(24)}
              color="#000"
            />
            <Text
              ml={widthPercentageToDP(2)}
              fontSize={Responsive(16)}
              color="#000"
            >
              Summary
            </Text>
          </Div>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          hasBackdrop={true}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
        >
          <Div flex={1} bg="#fff" rounded={10}>
            <Pressable
              style={{ justifyContent: "flex-end" }}
              onPress={toggleModal}
            >
              <Icon
                fontFamily="FontAwesome"
                name="close"
                fontSize={Responsive(24)}
                color="#000"
                alignSelf="flex-end"
                mr={widthPercentageToDP(3)}
                mt={heightPercentageToDP(2)}
              />
            </Pressable>
            <Text p={10} fontSize={Responsive(18)}>
              Hi, Michael!
            </Text>
            <Text p={10} fontSize={Responsive(16)} color="#000">
              Here's a summary of your latest uploads:
            </Text>
            <FlashList data={data} renderItem={list} />
          </Div>
        </Modal>
        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(2),
          }}
          onPress={() => alert("Logout")}
          activeOpacity={0.7}
        >
          <Div row>
            <Icon
              fontFamily="FontAwesome"
              name="sign-out"
              fontSize={Responsive(24)}
              color="#000"
            />
            <Text
              ml={widthPercentageToDP(2)}
              fontSize={Responsive(16)}
              color="#000"
            >
              Logout
            </Text>
          </Div>
        </TouchableOpacity>
      </Div>
    </Div>
  );
};

export default Settings;
