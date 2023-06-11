import React, { useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { Button, Div, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { COLOR_PRIMARY } from "../../helper/theme";

const Status = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName: any) => {
    setSelectedButton(buttonName);
  };
  const data = {
    data: [0.8],
  };
  const chartConfig = {
    backgroundGradientFrom: "#74b9ff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#74b9ff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };
  return (
    <Div bg="#fff" flex={1}>
      <Div
        mt={heightPercentageToDP(10)}
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
      <Div
        mt={heightPercentageToDP(1)}
        ml={widthPercentageToDP(8)}
        mr={widthPercentageToDP(8)}
        bg={COLOR_PRIMARY}
        rounded={8}
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
            <ProgressChart
              data={data}
              width={widthPercentageToDP(45)}
              height={heightPercentageToDP(15)}
              strokeWidth={5}
              radius={32}
              hideLegend={true}
              chartConfig={chartConfig}
            />
          </Div>
          <Div mt={heightPercentageToDP(4)}>
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
      </Div>
    </Div>
  );
};

export default Status;
