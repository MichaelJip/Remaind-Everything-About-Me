import { View, Text, FlatList } from "react-native";
import React from "react";
import { Div } from "react-native-magnus";
import { Calendar } from "react-native-calendars";
import moment from "moment";

const CalendarComponent = () => {
  const renderItem = ({ item }: any) => {
    const createdAt = moment(item?.date).format("MMM Do YYYY");

    return (
      <Div bg="#fff" py={10} px={10} m={10} rounded={8}>
        <Text>Created at: {createdAt}</Text>
        <Text>Desc: {item.desc}</Text>
        <Text>Time: {item?.time}</Text>
      </Div>
    );
  };
  return (
    <Div flex={1} bg="#fff">
      <Calendar
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
          data={[]}
          // keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </Div>
    </Div>
  );
};

export default CalendarComponent;
