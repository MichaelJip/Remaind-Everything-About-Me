import { Button, Div, Input, ScrollDiv, Text } from "react-native-magnus";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import Toast from "react-native-toast-message";
import axios from "axios";

const CardDetail = () => {
  const route = useRoute<any>()
  const params = route?.params
  const nav = useNavigation<any>();
  const [title, setTitle] = useState(params?.title);
  const [note, setNote] = useState(params?.note);  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateTimeFirst, setSelectedDateTimeFirst] = useState<Date>(
    new Date()
  );
  const [selectedDateTimeLast, setSelectedDateTimeLast] = useState<Date>(
    new Date()
  );
  
  const updateTask = async (
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
        .post("https://reminderapss.rianricardo.me/updatetask", {
          judul: title,          
          tanggal: selectedDate,
          waktu_awal:selectedDateTimeFirst,
          waktu_akhir:selectedDateTimeLast,
          note: note,
          aktifiti: "",
          id_task: params?.id,          
        })
        .then((res) => {                    
            if (res?.data?.Respone != 0) {
              Toast.show({
                type: "success",
                text1: `Task have been updated`,
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

  const deleteTask = async (
  ) => {
    try {      

      const response = await axios
        .post("https://reminderapss.rianricardo.me/deletetask", {      
          id_task: params?.id,          
        })
        .then((res) => {                    
            if (res?.data?.Respone != 0) {
              Toast.show({
                type: "success",
                text1: `Task have been deleted`,
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
        <Input placeholder="Title...." mt={heightPercentageToDP(0.5)} value={title} onChangeText={(val) => setTitle(val)} />
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
            // value={formatDate(selectedDate)}
            value={params?.date ? formatDate(selectedDate) : moment(params?.date).format('YYYY-MM-DD') }
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
        <Input placeholder="Note...." mt={heightPercentageToDP(0.5)} value={note} onChangeText={(val) => setNote(val)}/>
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
          onPress={() => nav.navigate("Activity", {
            katogri: params?.category
          })}
        >
          Choose Activity
        </Button>
      </Div>
      
      <Div
        bg="#c4c4c4"
        h={heightPercentageToDP(0.5)}
        mr={widthPercentageToDP(3)}
        ml={widthPercentageToDP(3)}
      />

      <Div row justifyContent="space-between" mt={heightPercentageToDP(1)}>
        <Button
          w={widthPercentageToDP(45)}
          ml={widthPercentageToDP(3)}
          mr={widthPercentageToDP(3)}
          bg="#f1c40f"
          color="#fff"
          fontWeight="bold"
          onPress={() => updateTask(title, note, selectedDate, selectedDateTimeFirst, selectedDateTimeLast)}
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
          onPress={() => deleteTask()}
        >
          Delete
        </Button>
      </Div>
    </ScrollDiv>
  );
};

export default CardDetail;
