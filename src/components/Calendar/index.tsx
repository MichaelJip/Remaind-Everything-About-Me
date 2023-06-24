import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Div } from "react-native-magnus";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";

const CalendarComponent = () => {
  const [selected, setSelected] = useState("");
  const data = [
    {
      createdAt: "2023-06-15",
      desc: "Olahraga",
      time: "06:00",
    },
  ];

  const [dbData, setData] = useState()  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://reminderapss.rianricardo.me/listtaks/${name}`
      );
      const data = response?.data;
      setData(data)
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
  const renderItem = ({ item }: any) => {
    const createdAt = moment(item?.date).format("MMM Do YYYY");
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
        <Text>Desc: {item.desc}</Text>
        <Text>Time: {item?.time}</Text>
      </Div>
    );
  };
  
  return (
    <Div flex={1} bg="#fff">
      <Calendar
        // Specify the current date
        current={"2023-06-15"}
        // Callback that gets called when the user selects a day
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        // Mark specific dates as marked
        markedDates={{
          "2023-06-15": { marked: true, selectedColor: "blue" },
          "2023-06-16": { marked: true },
          "2023-06-20": { marked: true, selectedColor: "blue" },
        }}
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
          data={data}
          // keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </Div>
    </Div>
  );
};

export default CalendarComponent;
