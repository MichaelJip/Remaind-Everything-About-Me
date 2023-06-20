import React from "react";
import { Button, Div, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { COLOR_PRIMARY } from "../../helper/theme";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const nav = useNavigation<any>();
  return (
    <Div flex={1}>
      <Div
        justifyContent="center"
        alignSelf="center"
        h={heightPercentageToDP(50)}
      >
        <Text
          fontSize={Responsive(32)}
          fontWeight="bold"
          w={widthPercentageToDP(40)}
          textAlign="center"
        >
          Remind Everything
        </Text>
      </Div>

      <Div
        h={heightPercentageToDP(100)}
        bg={COLOR_PRIMARY}
        roundedTopLeft={Responsive(50)}
        roundedTopRight={Responsive(50)}
      >
        <Div m={heightPercentageToDP(5)}>
          <Text fontWeight="bold" fontSize={Responsive(32)}>
            Welcome
          </Text>
          <Text w={widthPercentageToDP(80)}>
            Stay organized and never miss a beat with our innovative reminder
            app. Download now and experience effortless scheduling for a more
            productive life.
          </Text>
          <Div row mt={heightPercentageToDP(2)}>
            <Button
              bg="#000"
              color="#fff"
              rounded={Responsive(15)}
              w={widthPercentageToDP(30)}
              fontSize={Responsive(18)}
              fontWeight="500"
              onPress={() => nav.navigate("Login")}
            >
              Sign In
            </Button>
            <Button
              bg="#fff"
              color="#000"
              ml={widthPercentageToDP(2)}
              rounded={Responsive(15)}
              w={widthPercentageToDP(30)}
              fontSize={Responsive(18)}
              fontWeight="500"
              onPress={() => nav.navigate("Register")}
            >
              Sign Up
            </Button>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default Welcome;
