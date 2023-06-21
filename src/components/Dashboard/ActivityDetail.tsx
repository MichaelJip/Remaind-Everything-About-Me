import React, { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Div, ScrollDiv, Text } from "react-native-magnus";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import WebView from "react-native-webview";

const ActivityDetail = () => {
  const props = useRoute<any>();
  const params = props?.params;
  const [playing, setPlaying] = useState(false);
  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <Div flex={1}>
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
        {params?.title}
      </Text>
      <Text ml={widthPercentageToDP(4)}>Description: </Text>
      <WebView
        source={{ uri: params?.website }}
        style={{
          height: heightPercentageToDP(60),
          marginLeft: widthPercentageToDP(4),
          marginRight: widthPercentageToDP(4),
        }}
      />
    </Div>
  );
};

export default ActivityDetail;
