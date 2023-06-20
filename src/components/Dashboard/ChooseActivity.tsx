import React, { useCallback, useState, useEffect } from "react";
import { Div, Image, ScrollDiv, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChooseActivity = () => {
  const nav = useNavigation<any>();

  const data = [
    {
      videoId: "3p8EBPVZ2Iw",
      image:
        "https://i.ytimg.com/vi/3p8EBPVZ2Iw/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAeMaqV2PgKXMLGpFdP-W2EJ835Vg",
      title: "6 PACK ABS For Beginners You Can Do Anywhere",
      web: "https://www.today.com/health/home-ab-workouts-t245794",
    },
    {
      videoId: "g5oQZmk7xMc",
      image:
        "https://i.ytimg.com/an_webp/g5oQZmk7xMc/mqdefault_6s.webp?du=3000&sqp=CJCFxaQG&rs=AOn4CLCs4S1eZY9pFlvQOtC9Vz4ULZUi2Q",
      title: "Perfect Home Shoulder Workout (Dumbbells Only)",
      web: "",
    },
    {
      videoId: "hpyT2v04Bj0",
      image:
        "https://i.ytimg.com/vi/hpyT2v04Bj0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBwKX8UC9Vtc9kL-4R5riKNTbT83w",
      title:
        "LATIHAN PILATES BURN LEMAK SELURUH TUBUH 🔥 Memahat Tubuh Jam Pasir | 8 mnt",
      web: "",
    },
    {
      videoId: "2pLT-olgUJs",
      image:
        "https://i.ytimg.com/vi/2pLT-olgUJs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDqYaNS0xAWpSRVRP771EyKj81T6g",
      title: "Get Abs in 2 WEEKS | Abs Workout Challenge",
      web: "",
    },
  ];

  const cardVideo = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          nav.navigate("ActivityDetail", {
            videoLink: item?.videoId,
            title: item?.title,
            website: item?.web,
          })
        }
      >
        <Div rounded={10} h={"auto"} style={{ elevation: 4 }} m={10} bg="#fff">
          <Image
            h={heightPercentageToDP(25)}
            source={{ uri: item?.image }}
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
            {item?.title}
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

export default ChooseActivity;
