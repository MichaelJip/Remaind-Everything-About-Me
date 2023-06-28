import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Div, ScrollDiv, Text } from "react-native-magnus";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import WebView from "react-native-webview";
import { Responsive } from "../../../helper/Responsive";
import { COLOR_PRIMARY } from "../../../helper/theme";

const ActivityDetailUpdate = () => {
  const props = useRoute<any>();
  const params = props?.params;
  const nav = useNavigation<any>();
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  useEffect(() => {
    if (params?.videoLink) {
      setTimeout(() => {
        setPlaying(true);
      }, 5000); // Delay of 5 seconds (5000 milliseconds)
    }
  }, [params]);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <ScrollDiv flex={1}>
      <YoutubePlayer
        height={heightPercentageToDP(28)}
        webViewStyle={{ marginLeft: 10, marginTop: 10, marginRight: 10 }}
        play={playing}
        videoId={params?.videoLink}
        onChangeState={onStateChange}
      />
      <Text
        // mt={heightPercentageToDP(1)}
        ml={widthPercentageToDP(4)}
        mb={heightPercentageToDP(1)}
        fontWeight="bold"
        fontSize={16}
      >
        {params?.aktivitas}
      </Text>
      <Text ml={widthPercentageToDP(4)}>Description: </Text>
      <Text
        ml={widthPercentageToDP(4)}
        fontSize={Responsive(16)}
        fontWeight="500"
      >
        {params?.desc}
      </Text>        
      <Div h={heightPercentageToDP(20)} />
    </ScrollDiv>
  );
};

export default ActivityDetailUpdate;
