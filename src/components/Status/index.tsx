import React, { useEffect, useState } from "react";
import { Button, Div, Image, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { COLOR_PRIMARY } from "../../helper/theme";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import axios from "axios";

const Status = ({username}:any) => {
  const name = username?.params?.params?.username
  const [selectedButton, setSelectedButton] = useState('statusday');
  const [data, setData] = useState()
  const handleButtonPress = (buttonName: any) => {
    setSelectedButton(buttonName);
  };

  console.log(name)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://reminderapss.rianricardo.me/${selectedButton}/${name}`
      );
      const data = response?.data;
      setData(data)
    } catch (error) {
      console.log("There is an error:", error);
    }
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every 10 seconds
  
    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, [selectedButton]);

  console.log(data, 'check data status')


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
          bg={selectedButton === "statusday" ? COLOR_PRIMARY : COLOR_PRIMARY}
          opacity={selectedButton !== "statusday" ? 0.5 : 1}
          onPress={() => handleButtonPress("statusday")}
        >
          Daily
        </Button>
        <Button
          w={widthPercentageToDP(25)}
          bg={selectedButton === "statusweek" ? COLOR_PRIMARY : COLOR_PRIMARY}
          opacity={selectedButton !== "statusweek" ? 0.5 : 1}
          onPress={() => handleButtonPress("statusweek")}
        >
          Weekly
        </Button>
        <Button
          w={widthPercentageToDP(25)}
          bg={selectedButton === "statusmonth" ? COLOR_PRIMARY : COLOR_PRIMARY}
          opacity={selectedButton !== "statusmonth" ? 0.5 : 1}
          onPress={() => handleButtonPress("statusmonth")}
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
        <Div row mt={heightPercentageToDP(1)} mb={heightPercentageToDP(2)} justifyContent="center">          
          <Div mt={heightPercentageToDP(4)} ml={widthPercentageToDP(10)}>
            <Text
              fontSize={Responsive(20)}
              fontWeight="bold"
              textAlign="center"
            >
              {!data ? '-' : data[0]?.waktu_tidur === null ? '0' : data[0]?.waktu_tidur}
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
            Play
          </Text>
          <Div row>
            <Text
              fontSize={Responsive(16)}
              w={widthPercentageToDP(12)}
              fontWeight="bold"
              ml={widthPercentageToDP(5)}
            >
              {!data ? '-' : data[0]?.bermain === null ? '0' : data[0]?.bermain}
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
            Exercise
          </Text>
          <Div justifyContent="center" alignSelf="center">
            <Div row>
              <Text
                fontSize={Responsive(16)}
                w={widthPercentageToDP(12)}
                fontWeight="bold"
                ml={widthPercentageToDP(5)}
              >
                {!data ? '-' : data[0]?.olahraga === null ? '0' : data[0]?.olahraga} Kcal
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
            Eat
          </Text>
          <Div row>
            <Text
              fontSize={Responsive(16)}
              w={widthPercentageToDP(12)}
              fontWeight="bold"
              ml={widthPercentageToDP(5)}
            >
              {!data ? '-' : data[0]?.makanan === null ? '0' : data[0]?.makanan} Kcal
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
            Drink
          </Text>
          <Div justifyContent="center" alignSelf="center">
            <Div row>
              <Text
                fontSize={Responsive(16)}
                w={widthPercentageToDP(8)}
                fontWeight="bold"
                ml={widthPercentageToDP(5)}
              >
                {!data ? '-' : data[0]?.minum === null ? '0' : data[0]?.minum}
              </Text>
              <Image
                source={require("../../assets/drink.png")}
                h={heightPercentageToDP(12)}
                w={widthPercentageToDP(18)}
                ml={widthPercentageToDP(1)}
                mr={widthPercentageToDP(2)}
                resizeMode="contain"
                alignSelf="flex-end"
              />
            </Div>
          </Div>
        </LinearGradient>
      </Div>
    </Div>
  );
};

export default Status;
