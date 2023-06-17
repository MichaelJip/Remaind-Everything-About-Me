import React from "react";
import { Div, Icon, Image, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native'

const Settings = () => {
  const nav = useNavigation<any>()
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
          Michael
        </Text>
      </Div>

      <Div mt={heightPercentageToDP(5)}>
        <TouchableOpacity
          style={{
            marginLeft: widthPercentageToDP(4),
          }}
          onPress={() => nav.navigate('Profile')}
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
