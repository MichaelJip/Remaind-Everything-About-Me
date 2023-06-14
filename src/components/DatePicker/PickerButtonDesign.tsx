import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Div, Text } from "react-native-magnus";

type PickerButtonDesignPropTypes = {
  title: string;
  value: string;
  isDisabled?: boolean;
};

function PickerButtonDesign({
  title,
  value,
  isDisabled = false,
}: PickerButtonDesignPropTypes) {
  return (
    <Div bg="white" w="100%" h={54} rounded="md">
      <Div
        bg="white"
        w="100%"
        h={54}
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        pl={8}
        pr={13}
        rounded="md"
      >
        <Text fontSize="lg">{title}</Text>
        <Div flexDir="row" alignItems="center">
          <Text
            fontSize="lg"
            color={isDisabled ? "brandDimmed" : "brand"}
            fontWeight="500"
            pr={5}
          >
            {value}
          </Text>
          {!isDisabled ? (
            <Ionicons
              name="md-chevron-forward-outline"
              size={12}
              color="gray"
            />
          ) : null}
        </Div>
      </Div>
    </Div>
  );
}

export default PickerButtonDesign;
