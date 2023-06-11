import React from 'react'
import { Button, Div, Input, Text } from 'react-native-magnus'
import { Responsive } from '../../helper/Responsive'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Task = () => {
  return (
    <Div flex={1} bg='#fff'>
        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Title: </Text>
            <Input placeholder='Title....' mt={heightPercentageToDP(0.5)} />
        </Div>
        
        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Date: </Text>
            <Input placeholder='Title....' mt={heightPercentageToDP(0.5)} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Start Time: </Text>
            <Input placeholder='Title....' mt={heightPercentageToDP(0.5)} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Finish Time: </Text>
            <Input placeholder='Title....' mt={heightPercentageToDP(0.5)} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Note: </Text>
            <Input placeholder='Note....' mt={heightPercentageToDP(0.5)} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Recommendation: </Text>
            <Input placeholder='Title....' mt={heightPercentageToDP(0.5)} />
        </Div>

        <Button w={widthPercentageToDP(95)} ml={widthPercentageToDP(3)} mr={widthPercentageToDP(3)} bg='#000' color='#fff' fontWeight='bold'>
            Create
        </Button>
    </Div>
  )
}

export default Task