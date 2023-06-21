import { Button, Div, Input, Text } from "react-native-magnus";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useState } from "react";
import HeadlessDatePicker from "../DatePicker/HeadlessDatePicker";
import PickerButtonDesign from "../DatePicker/PickerButtonDesign";
import { formatDate } from "../../helper/formatDate";
import PickerTimerDesign from "../DatePicker/PickerTimerDesign";
import { useNavigation } from "@react-navigation/native";
const CardDetail = () => {
  const nav = useNavigation<any>()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateTimeFirst, setSelectedDateTimeFirst] = useState<Date>(
    new Date()
  );
  const [selectedDateTimeLast, setSelectedDateTimeLast] = useState<Date>(
    new Date()
  );
  return (
    <Div flex={1} bg="#fff">
      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Title:{" "}
        </Text>
        <Input placeholder="Title...." mt={heightPercentageToDP(0.5)} />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Date:{" "}
        </Text>
        <HeadlessDatePicker
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
        >
          <PickerButtonDesign
            title="Choose Date"
            value={formatDate(selectedDate)}
          />
        </HeadlessDatePicker>
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Start Time:{" "}
        </Text>
        <PickerTimerDesign
          selectedDates={selectedDateTimeFirst}
          onChangeDate={setSelectedDateTimeFirst}
        />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Finish Time:{" "}
        </Text>
        <PickerTimerDesign
          selectedDates={selectedDateTimeLast}
          onChangeDate={setSelectedDateTimeLast}
        />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Note:{" "}
        </Text>
        <Input placeholder="Note...." mt={heightPercentageToDP(0.5)} />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Activity:
        </Text>
        <Button
          w={widthPercentageToDP(95)}
          color="#000"
          borderColor="#000"
          borderWidth={1}
          bg="transparent"
          mt={heightPercentageToDP(1)}
          onPress={() => nav.navigate("Activity")}
        >
          Choose Activity
        </Button>
      </Div>

      <Div row justifyContent="space-between">
        <Button
          w={widthPercentageToDP(45)}
          ml={widthPercentageToDP(3)}
          mr={widthPercentageToDP(3)}
          bg="#f1c40f"
          color="#fff"
          fontWeight="bold"
        >
          Update
        </Button>
        <Button
          w={widthPercentageToDP(45)}
          ml={widthPercentageToDP(3)}
          mr={widthPercentageToDP(3)}
          bg="red"
          color="#fff"
          fontWeight="bold"
        >
          Delete
        </Button>
      </Div>
    </Div>
  );
};

export default CardDetail;
