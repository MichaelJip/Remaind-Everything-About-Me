import React, {useState} from 'react'
import { Button, Div, Input, Text } from 'react-native-magnus'
import { Responsive } from '../../helper/Responsive'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import HeadlessDatePicker from '../DatePicker/HeadlessDatePicker'
import PickerButtonDesign from '../DatePicker/PickerButtonDesign'
import { formatDate } from '../../helper/formatDate'
import PickerTimerDesign from '../DatePicker/PickerTimerDesign'

const Task = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateTimeFirst, setSelectedDateTimeFirst] = useState<Date>(new Date());
  const [selectedDateTimeLast, setSelectedDateTimeLast] = useState<Date>(new Date());
  const [items, setItems] = useState([
    {label: 'Push Up 20x', value: 'a'},
    {label: 'Nasi dan sayur bayam', value: 'b'},    
  ]);
  return (
    <Div flex={1} bg='#fff'>
        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Title: </Text>
            <Input placeholder='Title....' mt={heightPercentageToDP(0.5)} />
        </Div>
        
        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Date: </Text>
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
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Start Time: </Text>
            <PickerTimerDesign selectedDates={selectedDateTimeFirst} onChangeDate={setSelectedDateTimeFirst} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Finish Time: </Text>
            <PickerTimerDesign selectedDates={selectedDateTimeLast} onChangeDate={setSelectedDateTimeLast} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Note: </Text>
            <Input placeholder='Note....' mt={heightPercentageToDP(0.5)} />
        </Div>

        <Div p={10}>
            <Text fontSize={Responsive(20)} color='#000' fontWeight='500'>Recommendation: </Text>
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            />
        </Div>

        <Button w={widthPercentageToDP(95)} ml={widthPercentageToDP(3)} mr={widthPercentageToDP(3)} bg='#000' color='#fff' fontWeight='bold'>
            Create
        </Button>
    </Div>
  )
}

export default Task