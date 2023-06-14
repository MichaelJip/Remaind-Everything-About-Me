import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { startOfDay } from "date-fns";
import React, { useCallback, useState } from "react";
import { Platform, Pressable } from "react-native";
import { Button, Div, Modal } from "react-native-magnus";

export type HeadlessDatePickerPropTypes = {
  selectedDate: Date;
  onChangeDate?: (newDate: Date) => void;
  children: React.ReactNode;
};

const HeadlessDatePicker = ({
  selectedDate,
  onChangeDate,
  children,
}: HeadlessDatePickerPropTypes) => {
  const [isVisible, setIsVisible] = useState(false);

  const [localDate, setLocalDate] = useState(selectedDate);

  const onLocalChange = useCallback(
    (e: DateTimePickerEvent) => {
      if (e.nativeEvent.timestamp) {
        setLocalDate(startOfDay(new Date(e.nativeEvent.timestamp)));
      }
    },
    [setLocalDate]
  );

  const onChange = useCallback(
    (e: DateTimePickerEvent) => {
      if (e.nativeEvent.timestamp) {
        onChangeDate(startOfDay(new Date(e.nativeEvent.timestamp)));
      }
    },
    [onChangeDate]
  );

  const onMiddlePress = useCallback(() => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: selectedDate,
        onChange,
      });
    } else {
      setIsVisible(true);
      setLocalDate(selectedDate);
    }
  }, [onChange, selectedDate]);

  return (
    <>
      <Pressable onPress={onMiddlePress}>{children}</Pressable>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        h={300}
      >
        <RNDateTimePicker
          mode="date"
          display="spinner"
          themeVariant="light"
          value={localDate}
          onChange={onLocalChange}
        />
        <Div mx={20}>
          <Button
            block
            onPress={() => {
              onChangeDate(localDate);
              setIsVisible(false);
            }}
          >
            Ok
          </Button>
        </Div>
      </Modal>
    </>
  );
};

export default HeadlessDatePicker;
