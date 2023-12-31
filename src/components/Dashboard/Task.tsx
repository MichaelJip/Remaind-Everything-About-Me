import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { Button, Div, Input, ScrollDiv, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { Responsive } from "../../helper/Responsive";
import { formatDate } from "../../helper/formatDate";
import HeadlessDatePicker from "../DatePicker/HeadlessDatePicker";
import PickerButtonDesign from "../DatePicker/PickerButtonDesign";
import PickerTimerDesign from "../DatePicker/PickerTimerDesign";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Task = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const params = route?.params;
  console.log(params, "check params");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateTimeFirst, setSelectedDateTimeFirst] = useState<Date>(
    new Date()
  );
  const [selectedDateTimeLast, setSelectedDateTimeLast] = useState<Date>(
    new Date()
  );
  const [repeatValue, setRepeatValue] = useState(null);

  //For Notif
  const [expoPushToken, setExpoPushToken] = useState<any>("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
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

      // if (repeatValue === null) {
      //   // Handle single task creation
      //   await axios
      //     .post("https://reminderapss.rianricardo.me/task", {
      //       judul: title,
      //       tanggal: moment(selectedDate).format("YYYY-MM-DD h:mm:ss"),
      //       waktu_awal: moment(selectedDateTimeFirst).format(),
      //       waktu_akhir: moment(selectedDateTimeLast).format(),
      //       note: note,
      //       aktifiti: !params?.aktivitas ? "" : params?.aktivitas,
      //       username: params?.username,
      //       kategori: !params?.kategori ? params?.name : params?.kategori,
      //     })
      //     .then((res) => {
      //       if (res?.data?.Respone != 0) {
      //         Toast.show({
      //           type: "success",
      //           text1: `Task have been created`,
      //         });

      //         const notificationDateFirst = moment(selectedDate)
      //           .hour(selectedDateTimeFirst.getHours())
      //           .minute(selectedDateTimeFirst.getMinutes())
      //           .toDate();

      //         const notificationDateLast = moment(selectedDate)
      //           .hour(selectedDateTimeLast.getHours())
      //           .minute(selectedDateTimeLast.getMinutes())
      //           .toDate();

      //         // Schedule push notifications for task reminders
      //         schedulePushNotification({
      //           titles: `Mulai ${title}`,
      //           bodys: note,
      //           dates: notificationDateFirst,
      //         });

      //         schedulePushNotification({
      //           titles: `Selesai ${title}`,
      //           bodys: note,
      //           dates: notificationDateLast,
      //         });

      //         nav.navigate("Home");
      //       } else {
      //         Toast.show({
      //           type: "error",
      //           text1: "Error",
      //         });
      //       }
      //     });

      //   // Schedule push notifications and other logic as before
      // } else {
      //   for (let i = 0; i < repeatValue; i++) {
      //     // Calculate the adjusted start and finish times for each repetition
      //     const adjustedStartTime = moment(selectedDateTimeFirst)
      //       .add(i, "hours") // Increment by 1 hour for each repetition
      //       .format();

      //     const adjustedFinishTime = moment(selectedDateTimeLast)
      //       .add(i, "hours") // Increment by 1 hour for each repetition
      //       .format();

      //     // Use the adjusted times to create tasks for each repetition
      //     await axios
      //       .post("https://reminderapss.rianricardo.me/task", {
      //         judul: title,
      //         tanggal: moment(selectedDate).format("YYYY-MM-DD h:mm:ss"),
      //         waktu_awal: adjustedStartTime,
      //         waktu_akhir: adjustedFinishTime,
      //         note: note,
      //         aktifiti: !params?.aktivitas ? "" : params?.aktivitas,
      //         username: params?.username,
      //         kategori: !params?.kategori ? params?.name : params?.kategori,
      //       })
      //       .then((res) => {
      //         if (res?.data?.Respone != 0) {
      //           Toast.show({
      //             type: "success",
      //             text1: `Task have been created`,
      //           });

      //           const notificationDateFirst = moment(selectedDate)
      //             .hour(selectedDateTimeFirst.getHours())
      //             .minute(selectedDateTimeFirst.getMinutes())
      //             .toDate();

      //           const notificationDateLast = moment(selectedDate)
      //             .hour(selectedDateTimeLast.getHours())
      //             .minute(selectedDateTimeLast.getMinutes())
      //             .toDate();

      //           // Schedule push notifications for task reminders
      //           schedulePushNotification({
      //             titles: `Mulai ${title}`,
      //             bodys: note,
      //             dates: notificationDateFirst,
      //           });

      //           schedulePushNotification({
      //             titles: `Selesai ${title}`,
      //             bodys: note,
      //             dates: notificationDateLast,
      //           });

      //           nav.navigate("Home");
      //         } else {
      //           Toast.show({
      //             type: "error",
      //             text1: "Error",
      //           });
      //         }
      //       });
      //   }
      // }

      const response = await axios
        .post("https://reminderapss.rianricardo.me/task", {
          judul: title,
          tanggal: moment(selectedDate).format("YYYY-MM-DD h:mm:ss"),
          waktu_awal: moment(selectedDateTimeFirst).format(),
          waktu_akhir: moment(selectedDateTimeLast).format(),
          note: note,
          aktifiti: !params?.aktivitas ? "" : params?.aktivitas,
          username: params?.username,
          kategori: !params?.kategori ? params?.name : params?.kategori,
        })
        .then((res) => {
          if (res?.data?.Respone != 0) {
            Toast.show({
              type: "success",
              text1: `Task have been created`,
            });

            const notificationDateFirst = moment(selectedDate)
              .hour(selectedDateTimeFirst.getHours())
              .minute(selectedDateTimeFirst.getMinutes())
              .toDate();

            const notificationDateLast = moment(selectedDate)
              .hour(selectedDateTimeLast.getHours())
              .minute(selectedDateTimeLast.getMinutes())
              .toDate();

            // Schedule push notifications for task reminders
            schedulePushNotification({
              titles: `Mulai ${title}`,
              bodys: note,
              dates: notificationDateFirst,
            });

            schedulePushNotification({
              titles: `Selesai ${title}`,
              bodys: note,
              dates: notificationDateLast,
            });

            nav.navigate("Home");
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
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

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ScrollDiv flex={1} bg="#fff">
      <Div p={10}>
        <Text fontSize={Responsive(16)} color="#000" fontWeight="500">
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
        <Text fontSize={Responsive(16)} color="#000" fontWeight="500">
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
        <Text fontSize={Responsive(16)} color="#000" fontWeight="500">
          Start Time:
        </Text>
        <PickerTimerDesign
          selectedDates={selectedDateTimeFirst}
          onChangeDate={setSelectedDateTimeFirst}
        />
      </Div>

      <Div p={10}>
        <Text fontSize={Responsive(16)} color="#000" fontWeight="500">
          Finish Time:
        </Text>
        <PickerTimerDesign
          selectedDates={selectedDateTimeLast}
          onChangeDate={setSelectedDateTimeLast}
        />
      </Div>

      {/* <Div p={10}>
        <Text fontSize={Responsive(16)} color="#000" fontWeight="500">
          Repeat: 
        </Text>
        <Text fontSize={Responsive(16)} color="#000">
          Add 1 Hours in Start Time and Finish Time        
        </Text>
        <Div row justifyContent="space-around" mt={heightPercentageToDP(1)}>
          <Button
            w={"auto"}
            onPress={() => setRepeatValue(1)}
            bg="#fff"
            borderColor={"#000"}
            color="#000"
            borderWidth={1}
          >
            1x
          </Button>
          <Button
            w={"auto"}
            onPress={() => setRepeatValue(5)}
            bg="#fff"
            borderColor={"#000"}
            color="#000"
            borderWidth={1}
          >
            5x
          </Button>
          <Button
            w={"auto"}
            onPress={() => setRepeatValue(null)}
            bg="#fff"
            borderColor={"#000"}
            color="#000"
            borderWidth={1}
          >
            No Repeat
          </Button>
        </Div>
      </Div> */}

      <Div p={10}>
        <Text fontSize={Responsive(16)} color="#000" fontWeight="500">
          Note:{" "}
        </Text>
        <Input
          placeholder="Note...."
          mt={heightPercentageToDP(0.5)}
          value={note}
          onChangeText={(val) => setNote(val)}
        />
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
        onPress={() =>
          createTask(
            title,
            note,
            selectedDate,
            selectedDateTimeFirst,
            selectedDateTimeLast
          )
        }
      >
        Create
      </Button>
    </ScrollDiv>
  );
};

async function schedulePushNotification({ titles, bodys, dates }: any) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titles,
      body: bodys,
      // data: { data: 'goes here' },
    },
    trigger: { date: dates },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default Task;
