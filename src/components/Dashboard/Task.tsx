import React from 'react'
import { Div, Input, Text } from 'react-native-magnus'

const Task = () => {
  return (
    <Div flex={1} bg='#fff'>
        <Div>
            <Text>Title: </Text>
            <Input placeholder='Title....' />
        </Div>

        <Div>
            <Text>Date: </Text>
            <Input placeholder='Title....' />
        </Div>

        <Div>
            <Text>Start Time: </Text>
            <Input placeholder='Title....' />
        </Div>

        <Div>
            <Text>Finish Time: </Text>
            <Input placeholder='Title....' />
        </Div>

        <Div>
            <Text>Note: </Text>
            <Input placeholder='Note....' />
        </Div>

        <Div>
            <Text>Recommendation: </Text>
            <Input placeholder='Title....' />
        </Div>
    </Div>
  )
}

export default Task