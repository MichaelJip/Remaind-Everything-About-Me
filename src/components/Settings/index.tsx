import React from "react";
import { Div, Icon, Image, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { TouchableOpacity } from "react-native-gesture-handler";

const Settings = () => {
  return (
    <Div flex={1} bg="#fff">
      <Div
        justifyContent="center"
        alignSelf="center"
        mt={heightPercentageToDP(5)}
      >
        <Image
          h={100}
          w={100}
          m={10}
          rounded="circle"
          source={{
            uri: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          }}
        />
        <Text
          textAlign="center"
          mt={heightPercentageToDP(1)}
          fontSize={Responsive(20)}
          fontWeight="500"
        >
          Michael
        </Text>
      </Div>

      <Div mt={heightPercentageToDP(5)}>
        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(4),
          }}
          onPress={() => alert("Edit Profile")}
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
          onPress={() => alert("Edit Profile")}
          activeOpacity={0.7}
        >
          <Div row>
            <Icon
              fontFamily="FontAwesome"
              name="bell"
              fontSize={Responsive(20)}
              color="#000"
            />
            <Text
              ml={widthPercentageToDP(2)}
              fontSize={Responsive(16)}
              color="#000"
            >
              Notification
            </Text>
          </Div>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(4),
            marginTop: heightPercentageToDP(2),
          }}
          onPress={() => alert("Edit Profile")}
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
