import { View, Platform, Pressable } from "react-native";
import React, { useState } from "react";
import { Div, Text } from "react-native-magnus";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicer from "@react-native-community/datetimepicker";

export type HeadlessDatePickerPropTypes = {
  selectedDates: Date;
  onChangeDate?: (newDate: Date) => void;
  children: React.ReactNode;
};

const PickerTimerDesign = ({
  selectedDates,
  onChangeDate,
  children,
}: HeadlessDatePickerPropTypes) => {
  const [date, setDate] = useState(selectedDates);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      tempDate.getHours().toString().padStart(2, "0") +
      ":" +
      tempDate.getMinutes().toString().padStart(2, "0");
    setValue(fTime);

    onChangeDate && onChangeDate(currentDate);
  };
  return (
    <Pressable onPress={() => setShow(true)}>
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
          <Text fontSize="lg">Choose Time</Text>
          <Div flexDir="row" alignItems="center">
            <Text fontSize="lg" color={"brandDimmed"} fontWeight="500" pr={5}>
              {value}
            </Text>
            <Ionicons
              name="md-chevron-forward-outline"
              size={12}
              color="gray"
            />
          </Div>
        </Div>
      </Div>
      {show && (
        <DateTimePicer
          value={date}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Pressable>
  );
};

export default PickerTimerDesign;
