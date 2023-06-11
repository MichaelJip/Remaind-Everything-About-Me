import React from "react";
import { Image, StyleSheet, View, ImageSourcePropType } from "react-native";

import { Icon, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { COLOR_PRIMARY } from "./theme";

type PropsIcon = {
  focused: boolean;
  iconName: string;
  routeName?: string;
  iconFrom: any;
};

function TabbarIcon({ focused, iconName, routeName, iconFrom }: PropsIcon) {
  return (
    <View style={styles.box}>
      <Icon
        name={iconName}
        fontFamily={iconFrom || "Entypo"}
        fontSize={24}
        color={focused ? COLOR_PRIMARY : "#c4c4c4"}
      />
      <Text
        // type={focused ? 'semibold' : 'regular'}
        fontSize={12}
        color={focused ? COLOR_PRIMARY : "#c4c4c4"}
      >
        {routeName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: heightPercentageToDP(2),
    alignItems: "center",
    width: widthPercentageToDP(100 / 4),
    justifyContent: "center",
  },
  icon: {
    height: heightPercentageToDP(3),
    resizeMode: "contain",
  },
});

export default TabbarIcon;
