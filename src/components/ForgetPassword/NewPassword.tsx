import React, { useState } from 'react'
import { Button, Div, Input, ScrollDiv, Text } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_PRIMARY } from '../../helper/theme';
import { Responsive } from '../../helper/Responsive';
import { KeyboardAvoidingView, Platform } from 'react-native';

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const nav = useNavigation<any>();
  return (
    <Div flex={1} bg={COLOR_PRIMARY}>
      <Div
        m={heightPercentageToDP(2)}
        mt={heightPercentageToDP(40)}
        mb={heightPercentageToDP(5)}
      >
        <Text fontSize={Responsive(24)} fontWeight="bold">
          New Password
        </Text>
        <Text mt={heightPercentageToDP(1)}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        </Text>
      </Div>
      <ScrollDiv
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        h={heightPercentageToDP(100)}
        bg={"#fff"}
        roundedTopLeft={Responsive(50)}
        roundedTopRight={Responsive(50)}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Div
            mt={heightPercentageToDP(3)}
            ml={heightPercentageToDP(3)}
            mr={heightPercentageToDP(3)}
          >
            <Text fontWeight="bold" fontSize={Responsive(18)}>
              New Password:
            </Text>
            <Input
              mt={heightPercentageToDP(1)}
              placeholder="Password here...."
              value={password}
              onChangeText={(val) => setPassword(val)}
              keyboardType="visible-password"
              w={widthPercentageToDP(87)}
            />            
          </Div>
        </KeyboardAvoidingView>        
        <Button
          w={widthPercentageToDP(87)}
          m={heightPercentageToDP(3)}
          color="#fff"
          bg="#000"
          fontSize={Responsive(16)}
          fontWeight="500"
          rounded={16}
          onPress={() => nav.navigate("Login")}
        >
          Submit
        </Button>
      </ScrollDiv>
    </Div>
  );
};

export default NewPassword