import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Div } from "react-native-magnus";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";

const CalendarComponent = ({ username }: any) => {
  const name = username;
  const realName = name?.params?.params?.username;
  const [selected, setSelected] = useState<any>("");
  const [dbData, setData] = useState<any>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://reminderapss.rianricardo.me/listtaks/${realName}`
      );
      const data = response?.data;
      setData(data);
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
  }, []);

  const markedDates = dbData.reduce((markedDatesObj: any, item: any) => {
    const date = moment(item?.tanggal).format("YYYY-MM-DD");
    return {
      ...markedDatesObj,
      [date]: { marked: true, dotColor: "blue" },
    };
  }, {});

  const selectedItems = dbData
    .map((item: any) => {
      const date = moment(item.tanggal).format("YYYY-MM-DD");
      const startTime = moment(item.waktu_awal).format("HH:mm");
      const endTime = moment(item.waktu_akhir).format("HH:mm");

      return { ...item, date, startTime, endTime };
    })
    .filter((item: any) => item.date === selected);

  const renderItem = ({ item }: any) => {
    const createdAt = moment(item?.date).format("MMM Do YYYY");
    console.log(item, "check item");
    return (
      <Div
        bg="#fff"
        py={10}
        px={10}
        m={10}
        rounded={8}
        style={{ elevation: 3 }}
        borderColor="#000"
        borderWidth={1}
      >
        <Text>Created at: {createdAt}</Text>
        <Text>Note: {item.note}</Text>
        <Text>Start: {moment(item?.waktu_awal).format("LT")}</Text>
        <Text>End: {moment(item?.waktu_akhir).format("LT")}</Text>
      </Div>
    );
  };

  return (
    <Div flex={1} bg="#fff">
      <Calendar
        current={new Date()}
        // Callback that gets called when the user selects a day
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        // Mark specific dates as marked
        markedDates={markedDates}
        // markedDates={markedDates}
        // initialDate={initialDate}
        // onDayPress={(day) => {
        //   setInitialDate(day.dateString);
        //   setSelectedDate(day.dateString);
        // }}
        // onMonthChange={(month) => {
        //   setInitialDate(month.dateString);
        // }}
      />
      <Div bg="#fff" flex={1}>
        <FlatList
          data={selectedItems}
          // keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </Div>
    </Div>
  );
};

export default CalendarComponent;
