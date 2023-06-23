import React, { useState } from "react";
import { Button, Div, Input, ScrollDiv, Text } from "react-native-magnus";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeadlessDatePicker from "../DatePicker/HeadlessDatePicker";
import PickerButtonDesign from "../DatePicker/PickerButtonDesign";
import { formatDate } from "../../helper/formatDate";
import PickerTimerDesign from "../DatePicker/PickerTimerDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import moment from "moment";

const Task = () => {  
  const nav = useNavigation<any>();
  const route = useRoute<any>()
  const params = route?.params
  console.log(params)
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateTimeFirst, setSelectedDateTimeFirst] = useState<Date>(
    new Date()
  );
  const [selectedDateTimeLast, setSelectedDateTimeLast] = useState<Date>(
    new Date()
  );
  const createTask = async (
    title,
    note,
    selectedDate,
    selectedDateTimeFirst,
    selectedDateTimeLast
  ) => {
    try {
      if (
        !title ||
        !note ||
        !selectedDate ||
        selectedDateTimeFirst === new Date() ||
        selectedDateTimeLast === new Date()
      ) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter the missing value",
        });
        return;
      }

      const response = await axios
        .post("https://reminderapss.rianricardo.me/task", {
          judul: title,
          tanggal: moment(selectedDate).locale('id').format('YYYY-MM-DD'),
          waktu_awal: moment(selectedDateTimeFirst).locale('id').format("HH:mm:ss"),
          waktu_akhir: moment(selectedDateTimeLast).locale('id').format("HH:mm:ss"),
          note: note,
          aktifiti: "",
          username: params?.username,
          kategori: params?.name,
        })
        .then((res) => {                    
            if (res?.data?.Respone != 0) {
              Toast.show({
                type: "success",
                text1: `Task have been created`,
              });
              nav.navigate("Home")
            } else{

            Toast.show({
              type: 'error',
              text1: 'Error',
            });
          }
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred during creating task",
      });
      console.log(error);
    }
  };
  return (
    <ScrollDiv flex={1} bg="#fff">
      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Title:
        </Text>
        <Input
          placeholder="Title...."
          mt={heightPercentageToDP(0.5)}
          value={title}
          onChangeText={(val) => setTitle(val)}
        />
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
        <Input placeholder="Note...." mt={heightPercentageToDP(0.5)} value={note} onChangeText={(val) => setNote(val)} />
      </Div>

      {/* <Div p={10}>
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
      </Div> */}

      <Div
        bg="#c4c4c4"
        h={heightPercentageToDP(0.5)}
        mr={widthPercentageToDP(3)}
        ml={widthPercentageToDP(3)}
      />

      <Button
        w={widthPercentageToDP(95)}
        ml={widthPercentageToDP(3)}
        mr={widthPercentageToDP(3)}
        mt={heightPercentageToDP(1)}
        bg="#000"
        color="#fff"
        fontWeight="bold"
        onPress={() => createTask(title, note, selectedDate,selectedDateTimeFirst,selectedDateTimeLast)}
      >
        Create
      </Button>
    </ScrollDiv>
  );
};

export default Task;
