import React from "react";
import { Div, Text } from "react-native-magnus";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { ProgressChart } from "react-native-chart-kit";

const Dashboard = () => {
  const data = {
    data: [0.5],
  };
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  const ChartComponent = () => {
    return (
      <Div
        row
        bg="#fff"
        m={widthPercentageToDP(4)}
        rounded={widthPercentageToDP(5)}
        borderWidth={0.5}
        borderColor="#000"
      >
        <Div>
          <ProgressChart
            data={data}
            width={widthPercentageToDP(30)}
            height={220}
            strokeWidth={5}
            radius={32}
            hideLegend={true}
            chartConfig={chartConfig}
          />
        </Div>
        <Div justifyContent="center" alignItems="center">
          <Text fontWeight="bold" fontSize={Responsive(24)}>
            Your Plan for today
          </Text>
          <Text fontSize={Responsive(16)} color="#c4c4c4">
            5 of 10 Completed
          </Text>
        </Div>
      </Div>
    );
  };
  return (
    <Div>
      <ChartComponent />
      <Div
        row
        justifyContent="space-between"
        p={widthPercentageToDP(4)}
        bg="#fff"
        borderWidth={0.5}
        borderColor="#000"
        h={heightPercentageToDP(12)}
        ml={widthPercentageToDP(4)}
        mr={widthPercentageToDP(4)}
        rounded={8}
      >
        <Div ml={widthPercentageToDP(2)} mt={heightPercentageToDP(1)}>
          <Text fontWeight="bold" fontSize={Responsive(20)}>
            Morning Walk
          </Text>
          <Text fontSize={Responsive(16)}>Michael</Text>
        </Div>
        <Div mr={widthPercentageToDP(2)} mt={heightPercentageToDP(1)}>
          <Text fontWeight="bold" fontSize={Responsive(24)}>
            06:00
          </Text>
        </Div>
      </Div>
    </Div>
  );
};

export default Dashboard;