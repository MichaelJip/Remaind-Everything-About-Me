import React, { useEffect, useState } from "react";
import { Button, Div, Icon, Input, Modal, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { COLOR_PRIMARY } from "../../helper/theme";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet,  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategory = () => {
  const nav = useNavigation<any>();
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
  try {
    const storedCategories = await AsyncStorage.getItem('categories');
    if (storedCategories !== null) {
      const parsedCategories = JSON.parse(storedCategories);
      setCategories([...data, ...parsedCategories]);
    } else {
      setCategories(data);
    }
  } catch (error) {
    console.log('Error loading categories:', error);
  }
};

  const saveCategories = async (updatedCategories:any) => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
    } catch (error) {
      console.log('Error saving categories:', error);
    }
  };

  const addCategory = () => {
  if (categoryName.trim() === '') {
    return;
  }

  const newCategory = { name: categoryName };

  if (categories.some((category:any) => category.name === categoryName)) {
    Alert.alert('Duplicate Category', 'A category with the same name already exists.');
    return;
  }

  const updatedCategories = [...categories, newCategory];
  setCategories(updatedCategories);
  saveCategories(updatedCategories);
  setCategoryName('');
  setVisible(false);
};

   const deleteCategory = (category:any) => {
    if (isInitialCategory(category)) {
      Alert.alert("Can't be deleted", "This category is part of the initial data and can't be deleted.");
      return;
    }

    const updatedCategories = categories.filter((item:any) => item.name !== category.name);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  const isInitialCategory = (category:any) => {
    return data.some((item:any) => item.name === category.name);
  };

  const data = [
    {
      name: 'Olahraga'
    },
    {
      name: 'Tidur'
    },
    {
      name: 'Makan'
    },
    {
      name: 'Minum'
    },
    {
      name: 'Lainnya'
    },
  ]
  const cardList = ({item}:any) => {
    return(
      <Pressable onPress={() => nav.navigate("Task", {
        name: item?.name
      })}>
        <Div row h={heightPercentageToDP(8)} bg={COLOR_PRIMARY} m={10} rounded={8} justifyContent="space-between">
          <Text
            fontSize={Responsive(24)}
            ml={widthPercentageToDP(5)}            
            fontWeight="500"
            textAlign="center"            
          >
            {item?.name}
          </Text>
          {!isInitialCategory(item) && (
          <TouchableOpacity onPress={() => deleteCategory(item)} style={{alignSelf: 'center'}}>
            <Icon fontFamily="FontAwesome" name="trash" fontSize={Responsive(24)} color="red" mr={widthPercentageToDP(5)} />
          </TouchableOpacity>
        )}
        </Div>
      </Pressable>
    )
  }
  return (
    <Div flex={1} bg="#fff">
      <FlashList 
        data={categories}
        renderItem={cardList}
      />
      <Div position="absolute" bottom={24} right={24}>
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.7}
          onPress={() => setVisible(true)}
        >
          <Icon
            fontFamily="AntDesign"
            name="pluscircle"
            color={COLOR_PRIMARY}
            fontSize={Responsive(40)}
          />
        </TouchableOpacity>
        <Modal isVisible={visible} h={heightPercentageToDP(40)}>
          <Pressable onPress={() => setVisible(false)}>
            <Icon color="black900" name="close" fontSize={Responsive(20)} alignSelf="flex-end" mr={widthPercentageToDP(3)} mt={heightPercentageToDP(2)} /> 
          </Pressable>        

          <Div p={10}>
            <Text>Name:</Text>
            <Input placeholder="category name..." mt={heightPercentageToDP(1)} value={categoryName}
            onChangeText={(text) => setCategoryName(text)}/>
          </Div>  
          <Button bg={COLOR_PRIMARY} ml={widthPercentageToDP(3)} w={widthPercentageToDP(94)} onPress={addCategory} >
            Add Category
          </Button>
        </Modal>
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
  },
});

export default AddCategory;
