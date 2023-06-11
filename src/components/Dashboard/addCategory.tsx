import React from 'react'
import { Div, Text } from 'react-native-magnus'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { Responsive } from '../../helper/Responsive'
import { COLOR_PRIMARY } from '../../helper/theme'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const AddCategory = () => {
  const nav = useNavigation()
  return (
    <Div flex={1} bg='#fff'>
        <Pressable>
            <Div h={heightPercentageToDP(8)} bg={COLOR_PRIMARY} m={10} rounded={8}>
                <Text fontSize={Responsive(24)} ml={widthPercentageToDP(5)} mt={heightPercentageToDP(2)} fontWeight='500'>Olahraga</Text>
            </Div>
        </Pressable>
        <Div h={heightPercentageToDP(8)} bg={COLOR_PRIMARY} m={10} rounded={8}>
            <Text fontSize={Responsive(24)} ml={widthPercentageToDP(5)} mt={heightPercentageToDP(2)} fontWeight='500'>Tidur</Text>
        </Div><Div h={heightPercentageToDP(8)} bg={COLOR_PRIMARY} m={10} rounded={8}>
            <Text fontSize={Responsive(24)} ml={widthPercentageToDP(5)} mt={heightPercentageToDP(2)} fontWeight='500'>Makan</Text>
        </Div>
    </Div>
  )
}

export default AddCategory