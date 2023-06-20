import React, { useState } from "react";
import { Button, Div, Input, Text } from "react-native-magnus";
import { Responsive } from "../../helper/Responsive";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import DropDownPicker from "react-native-dropdown-picker";
import HeadlessDatePicker from "../DatePicker/HeadlessDatePicker";
import PickerButtonDesign from "../DatePicker/PickerButtonDesign";
import { formatDate } from "../../helper/formatDate";

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("m");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [items, setItems] = useState([
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
  ]);
  return (
    <Div flex={1} bg="#fff">
      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Name:{" "}
        </Text>
        <Input
          placeholder="Name...."
          value="Michael"
          mt={heightPercentageToDP(0.5)}
        />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          DOB:{" "}
        </Text>
        <HeadlessDatePicker
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
        >
          <PickerButtonDesign
            title="Date Of Birth"
            value={formatDate(selectedDate)}
          />
        </HeadlessDatePicker>
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Email:{" "}
        </Text>
        <Input
          placeholder="email...."
          value="michael068@binus.ac.id"
          mt={heightPercentageToDP(0.5)}
        />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(20)} color="#000" fontWeight="500">
          Gender:{" "}
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </Div>

      <Button
        w={widthPercentageToDP(95)}
        ml={widthPercentageToDP(3)}
        mr={widthPercentageToDP(3)}
        bg="#000"
        color="#fff"
        fontWeight="bold"
      >
        Simpan
      </Button>
    </Div>
  );
};

export default EditProfile;
