import React, { useCallback, useState, useEffect } from "react";
import { Div, Image, ScrollDiv, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const ChooseActivityUpdate = () => {
  const nav = useNavigation<any>();
  const route = useRoute();
  const params = route?.params;
  console.log(params, 'dalam activity list')
  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://reminderapss.rianricardo.me/listaktiviti/${params?.kategori}`
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
    }, 100); // Fetch data every 10 seconds

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);
  const cardVideo = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          nav.navigate("ActivityDetailUpdate", {
            videoLink: item?.link_vid,
            title: item?.kategori_aktivitas,
            desc: item?.ket,
            name: params?.username,
            aktivitas: item?.judul_aktivitas,
          })
        }
      >
        <Div rounded={10} h={"auto"} style={{ elevation: 4 }} m={10} bg="#fff">
          <Image
            h={heightPercentageToDP(25)}
            source={{ uri: item?.link_gambar }}
            ml={10}
            mt={10}
            mr={10}
          />
          <Text
            mt={heightPercentageToDP(1)}
            ml={widthPercentageToDP(4)}
            mb={heightPercentageToDP(2)}
            fontWeight="bold"
            fontSize={16}
          >
            {item?.judul_aktivitas}
          </Text>
        </Div>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollDiv>
      <FlashList data={data} renderItem={cardVideo} />
    </ScrollDiv>
  );
};

export default ChooseActivityUpdate;
