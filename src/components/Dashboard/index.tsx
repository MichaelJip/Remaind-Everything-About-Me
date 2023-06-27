import React, { useEffect, useState } from "react";
import { Div, Fab, Icon, ScrollDiv, Text } from "react-native-magnus";
import { Responsive } from "../../helper/Responsive";
import { Pressable } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { ProgressChart } from "react-native-chart-kit";
import { COLOR_PRIMARY } from "../../helper/theme";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import Loading from "../../helper/Loading";

const Dashboard = ({ username }: any) => {
  const name = username;  
  const nav = useNavigation<any>();
  const [dbData, setData] = useState<any>()  
  const [update, setUpdate] = useState<any>()
  const [statusMap, setStatusMap] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('filterday');  
  const [items, setItems] = useState([
    { label: "Today", value: "filterday" },
    { label: "Weekly", value: "filterweek" },
    { label: "Monthly", value: "filtermonth" },
  ]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://reminderapss.rianricardo.me/${value}/${name}`
      );
      const data = response?.data;
      setData(data)
    } catch (error) {
      console.log("There is an error:", error);
    }
  };  

  const numberPlan = async () => {
    try {
      const response = await axios.get(
        `https://reminderapss.rianricardo.me/listtaksdone/${name}`
      );
      const data = response?.data;
      setUpdate(data)
    } catch (error) {
      console.log("There is an error:", error);
    }
  };  

  // const updateStatus = async (id_task:any) => {
  //   console.log(id_task, 'asd ')
  //   try {      
  //     const status = statusMap[id_task] || 0
  //     const response = await axios
  //       .post("https://reminderapss.rianricardo.me/updatetaskdone", {
  //         status: status,
  //         id_task: id_task
  //       })
  //       .then((res) => {
  //         console.log(res)
  //       });
  //   } catch (error) {      
  //     console.warn(error);
  //   }
  // };

  const updateStatus = async (id_task: any) => {
  // console.log("Updating status for id_task:", id_task);

  try {      
    const status = statusMap[id_task];
    console.log("Sending update request with status:", status);

    const response = await axios.post("https://reminderapss.rianricardo.me/updatetaskdone", {
      status: 1,
      id_task: id_task
    });

    console.log("Update response:", response);
  } catch (error) {      
    console.warn("Update error:", error);
  }
};

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every 10 seconds
  
    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      numberPlan();
    }, 1000); // Fetch data every 10 seconds
    
    
    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);

  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentTime = new Date();
  //     const checkMoment = moment(currentTime).format()
  //     console.log(checkMoment)

  //     dbData?.forEach((task) => {                
  //       const { id_task, waktu_akhir } = task;        
  //       const endTime = moment(waktu_akhir).format();

  //       setStatusMap(prevStatusMap => ({
  //         ...prevStatusMap,
  //         [id_task]: checkMoment >= endTime ? 1 : 0
  //       }));

        
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    const currentTime = new Date();
    const checkMoment = moment(currentTime).format();

    // console.log("Current time:", checkMoment);

    dbData?.forEach((task: any) => {                
      const { id_task, waktu_akhir } = task;        
      const endTime = moment(waktu_akhir).format();

      // console.log("Task ID:", id_task);
      // console.log("End time:", endTime);

      setStatusMap((prevStatusMap: any) => {
        const updatedStatusMap = {
          ...prevStatusMap,
          [id_task]: checkMoment >= endTime ? 1 : 0
        };

        // console.log("Updated status map:", updatedStatusMap);

        // Call updateStatus if the status changes to 1
        if (prevStatusMap[id_task] !== updatedStatusMap[id_task] && updatedStatusMap[id_task] === 1) {
          updateStatus(id_task);
        }                
        return updatedStatusMap;
      });
    });
  }, 1000);

  return () => {
    clearInterval(interval);
  };
  }, []);
  

  const data = {
    data: [0.2],
  };
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  const ChartComponent = () => {
    return (
      <Div
        row
        bg="#fff"
        m={widthPercentageToDP(4)}
        rounded={widthPercentageToDP(5)}
        borderWidth={0.5}
        borderColor="#000"
      >
        <Div>
          <ProgressChart
            data={data}
            width={widthPercentageToDP(30)}
            height={220}
            strokeWidth={5}
            radius={32}
            hideLegend={true}
            chartConfig={chartConfig}
          />
        </Div>
        <Div justifyContent="center" alignItems="center">
          {/* {dbData?.map((task) => {            
            return(
            <Text key={task.id_task}>
              Task ID: {task.id_task}, Status: {statusMap[task.id_task]}
            </Text>
          )})} */}
          <Text fontWeight="bold" fontSize={Responsive(24)}>
            Your Plan for today
          </Text>
          <Text fontSize={Responsive(16)} color="#c4c4c4">
            {!update ? '-' : update[0]?.done} of { !dbData ?  '-' : dbData?.length} Completed
          </Text>
        </Div>
      </Div>
    );
  };

  const CardNotif = ({ item }: any) => {
    return (
      <Pressable onPress={() => nav.navigate("TaskDetail", {
        name: username,
        id: item?.id_task,
        title: item?.judul,
        note: item?.note,
        category: item?.kategori,
        start: item?.waktu_awal,
        end: item?.waktu_akhir,
        date: item?.tanggal
      })}>
        <Div
          row
          justifyContent="space-between"
          p={widthPercentageToDP(4)}
          bg="#fff"
          borderWidth={0.5}
          borderColor="#000"
          h={"auto"}
          mt={heightPercentageToDP(1)}
          ml={widthPercentageToDP(4)}
          mr={widthPercentageToDP(4)}
          mb={heightPercentageToDP(2)}
          rounded={8}
        >
          <Div ml={widthPercentageToDP(2)} mt={heightPercentageToDP(1)}>
            <Text fontWeight="bold" fontSize={Responsive(20)}>
              {item?.judul}
            </Text>
            <Text fontSize={Responsive(16)}>{item?.kategori}</Text>
            <Text
              fontSize={Responsive(12)}
              w={widthPercentageToDP(60)}
              numberOfLines={2}
            >
              {item?.note}
            </Text>
          </Div>
          <Div justifyContent="center">
            <Div
              mr={widthPercentageToDP(2)}
              // mt={heightPercentageToDP(1)}
              justifyContent="center"
            >
              <Text fontWeight="bold" fontSize={Responsive(16)} color="green">
              {moment(item?.waktu_awal).format('LT')}              
              </Text>
            </Div>
            <Div h={heightPercentageToDP(0.3)} bg="#c4c4c4" mr={widthPercentageToDP(2)} />
            <Div
              mr={widthPercentageToDP(2)}
              // mt={heightPercentageToDP(1)}
              justifyContent="center"
            >
              <Text fontWeight="bold" fontSize={Responsive(16)} color="red">
                {moment(item?.waktu_akhir).format('LT')}
              </Text>
            </Div>
          </Div>
        </Div>
      </Pressable>
    );
  };

  return (
    <Div flex={1} bg="#fff">
      <ScrollView>
        <Div flex={1}>
          <ChartComponent />
          <Div justifyContent="flex-end" alignSelf="flex-end" w={widthPercentageToDP(30)} mr={widthPercentageToDP(4)}>
            <DropDownPicker
                closeAfterSelecting={true}
                placeholder="Filter"
                dropDownDirection="TOP"          
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />            
          </Div>
            <FlashList data={dbData} renderItem={CardNotif} />            
        </Div>
      </ScrollView>
      <Div position="absolute" bottom={24} right={24}>
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.7}
          onPress={() => nav.navigate("Category", {
            username: username
          })}
        >
          <Icon
            fontFamily="AntDesign"
            name="pluscircle"
            color={COLOR_PRIMARY}
            fontSize={Responsive(40)}
          />
        </TouchableOpacity>
      </Div>
    </Div>
  );
};

const styles = StyleSheet.create({
  fab: {
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginBottom: heightPercentageToDP(1),
    backgroundColor: '#fff',
    elevation: 4
  },
});

export default Dashboard;
