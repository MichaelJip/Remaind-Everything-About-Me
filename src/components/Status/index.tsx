import React, { useState } from "react";
import { Button, Div, Image, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { COLOR_PRIMARY } from "../../helper/theme";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";

const Status = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName: any) => {
    setSelectedButton(buttonName);
  };
  return (
    <Div bg="#fff" flex={1}>
      <Div
        mt={heightPercentageToDP(2)}
        ml={widthPercentageToDP(8)}
        mr={widthPercentageToDP(8)}
        row
        justifyContent="space-between"
      >
        <Button
          w={widthPercentageToDP(25)}
          bg={selectedButton === "Daily" ? COLOR_PRIMARY : COLOR_PRIMARY}
          opacity={selectedButton !== "Daily" ? 0.5 : 1}
          onPress={() => handleButtonPress("Daily")}
        >
          Daily
        </Button>
        <Button
          w={widthPercentageToDP(25)}
          bg={selectedButton === "Weekly" ? COLOR_PRIMARY : COLOR_PRIMARY}
          opacity={selectedButton !== "Weekly" ? 0.5 : 1}
          onPress={() => handleButtonPress("Weekly")}
        >
          Weekly
        </Button>
        <Button
          w={widthPercentageToDP(25)}
          bg={selectedButton === "Monthly" ? COLOR_PRIMARY : COLOR_PRIMARY}
          opacity={selectedButton !== "Monthly" ? 0.5 : 1}
          onPress={() => handleButtonPress("Monthly")}
        >
          Monthly
        </Button>
      </Div>

      {/* Chart */}
      <LinearGradient
        colors={["#74B9FF", "#31BAC2"]}
        // colors={['red', 'blue']}
        locations={[0.2, 0.8]}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 0.1, y: 1.1 }}
        style={{
          marginTop: heightPercentageToDP(1),
          marginLeft: widthPercentageToDP(8),
          marginRight: widthPercentageToDP(8),
          backgroundColor: COLOR_PRIMARY,
          borderRadius: 8,
          height: heightPercentageToDP(29),
        }}
      >
        <Text
          fontSize={Responsive(24)}
          fontWeight="500"
          textAlign="center"
          mt={heightPercentageToDP(1)}
        >
          Sleep Analysis
        </Text>
        <Div row mt={heightPercentageToDP(1)} mb={heightPercentageToDP(2)}>
          <Div>
            <Progress.Circle
              progress={0.4}
              size={70}
              style={{
                marginTop: heightPercentageToDP(2.5),
                marginLeft: widthPercentageToDP(10),
                marginRight: widthPercentageToDP(5),
              }}
            />
          </Div>
          <Div mt={heightPercentageToDP(4)} ml={widthPercentageToDP(10)}>
            <Text
              fontSize={Responsive(20)}
              fontWeight="bold"
              textAlign="center"
            >
              7h 30m
            </Text>
            <Text>Sleep Duration</Text>
          </Div>
        </Div>
        <Image
          source={require("../../assets/sleep.png")}
          h={heightPercentageToDP(10)}
          w={widthPercentageToDP(60)}
          alignSelf="flex-end"
        />
      </LinearGradient>

      <Div row>
        <LinearGradient
          colors={["#74B9FF", "#31BAC2"]}
          locations={[0.2, 0.8]}
          start={{ x: 0, y: 0.7 }}
          end={{ x: 0.1, y: 1.1 }}
          style={{
            marginTop: heightPercentageToDP(1),
            marginLeft: widthPercentageToDP(8),
            marginRight: widthPercentageToDP(8),
            backgroundColor: COLOR_PRIMARY,
            borderRadius: 8,
            height: heightPercentageToDP(17),
            width: widthPercentageToDP(38),
          }}
        >
          <Text
            fontSize={Responsive(20)}
            fontWeight="500"
            textAlign="center"
            mt={heightPercentageToDP(1)}
          >
            Lainnya
          </Text>
          <Div row>
            <Text
              fontSize={Responsive(16)}
              w={widthPercentageToDP(12)}
              fontWeight="bold"
              ml={widthPercentageToDP(5)}
            >
              1 of 4
            </Text>
            <Image
              source={require("../../assets/lain.png")}
              h={heightPercentageToDP(12)}
              w={widthPercentageToDP(20)}
              ml={widthPercentageToDP(1)}
              resizeMode="contain"
              alignSelf="flex-end"
            />
          </Div>
        </LinearGradient>

        <LinearGradient
          colors={["#74B9FF", "#31BAC2"]}
          locations={[0.2, 0.8]}
          start={{ x: 0, y: 0.7 }}
          end={{ x: 0.1, y: 1.1 }}
          style={{
            marginTop: heightPercentageToDP(1),
            backgroundColor: COLOR_PRIMARY,
            borderRadius: 8,
            height: heightPercentageToDP(17),
            width: widthPercentageToDP(38),
          }}
        >
          <Text
            fontSize={Responsive(20)}
            fontWeight="500"
            textAlign="center"
            mt={heightPercentageToDP(1)}
          >
            Olahraga
          </Text>
          <Div justifyContent="center" alignSelf="center">
            <Div row>
              <Text
                fontSize={Responsive(16)}
                w={widthPercentageToDP(12)}
                fontWeight="bold"
                ml={widthPercentageToDP(5)}
              >
                1698 Kcal
              </Text>
              <Image
                source={require("../../assets/or.png")}
                h={heightPercentageToDP(12)}
                w={widthPercentageToDP(10)}
                ml={widthPercentageToDP(1)}
                mr={widthPercentageToDP(2)}
                resizeMode="contain"
                alignSelf="flex-end"
              />
            </Div>
          </Div>
        </LinearGradient>
      </Div>

      <Div row>
        <LinearGradient
          colors={["#74B9FF", "#31BAC2"]}
          locations={[0.2, 0.8]}
          start={{ x: 0, y: 0.7 }}
          end={{ x: 0.1, y: 1.1 }}
          style={{
            marginTop: heightPercentageToDP(1),
            marginLeft: widthPercentageToDP(8),
            marginRight: widthPercentageToDP(8),
            backgroundColor: COLOR_PRIMARY,
            borderRadius: 8,
            height: heightPercentageToDP(17),
            width: widthPercentageToDP(38),
          }}
        >
          <Text
            fontSize={Responsive(20)}
            fontWeight="500"
            textAlign="center"
            mt={heightPercentageToDP(1)}
          >
            Makan
          </Text>
          <Div row>
            <Text
              fontSize={Responsive(16)}
              w={widthPercentageToDP(12)}
              fontWeight="bold"
              ml={widthPercentageToDP(5)}
            >
              350 Kcal
            </Text>
            <Image
              source={require("../../assets/makan.png")}
              h={heightPercentageToDP(12)}
              w={widthPercentageToDP(20)}
              resizeMode="contain"
              alignSelf="flex-end"
            />
          </Div>
        </LinearGradient>
      </Div>
    </Div>
  );
};

export default Status;
