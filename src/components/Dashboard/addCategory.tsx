import React, { useEffect, useState } from "react";
import { Button, Div, Icon, Input, Modal, Text } from "react-native-magnus";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Responsive } from "../../helper/Responsive";
import { COLOR_PRIMARY } from "../../helper/theme";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddCategory = () => {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const params = route?.params;  
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const data = [
    {
      judul: "OLAHRAGA",
    },
    {
      judul: "MAKANAN",
    },
    {
      judul: "TIDUR",
    },
    {
      judul: "MINUM",
    },
    {
      judul: "BERMAIN",
    },
  ];

  const fetchCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("categories");
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        setCategories(parsedCategories); // Update categories with parsed categories only
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const addCategory = () => {
    if (categoryName.trim() !== "") {
      const newCategory = { judul: categoryName };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setCategoryName("");
      setVisible(false);
      saveCategories(updatedCategories); // Save categories to local storage
    }
  };

  const deleteCategory = async (index: number) => {
    if (index >= data.length) {
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
      saveCategories(updatedCategories); // Update categories in local storage
    }
  };

  const saveCategories = async (categories: any) => {
    try {
      await AsyncStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.log("Error saving categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories from local storage on component mount
  }, []);

  const cardList = ({ item, index }: any) => {
    return (
      <Pressable       
        onPress={() => {
          const foundCategory = data.find(category => category.judul === item?.judul);
          console.warn(foundCategory)
          if (foundCategory) {
            // Data is the same, navigate to "Task" screen
            nav.navigate("Activity", {
              name: item?.judul,
              username: params?.username,
            });
          } else {
            // Data is different, navigate to "Activity" screen            
            nav.navigate("Task", {
              name: item?.judul,
              username: params?.username,
            });
          }
        }}
      >
        <Div
          row
          h={heightPercentageToDP(8)}
          bg={COLOR_PRIMARY}
          m={10}
          rounded={8}
          justifyContent="space-between"
        >
          <Text
            fontSize={Responsive(24)}
            ml={widthPercentageToDP(5)}
            fontWeight="500"
            textAlign="center"
          >
            {item?.judul}
          </Text>
          {index >= data.length && (
            <TouchableOpacity
              onPress={() => deleteCategory(index)}
              style={{
                alignSelf: "center",
              }}
            >
              <Icon
                fontFamily="AntDesign"
                name="delete"
                color="red"
                fontSize={Responsive(24)}
                mr={widthPercentageToDP(5)}
              />
            </TouchableOpacity>
          )}
        </Div>
      </Pressable>
    );
  };
  return (
    <Div flex={1} bg="#fff">
      <FlashList data={categories} renderItem={cardList} />
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
            <Icon
              color="black900"
              name="close"
              fontSize={Responsive(20)}
              alignSelf="flex-end"
              mr={widthPercentageToDP(3)}
              mt={heightPercentageToDP(2)}
            />
          </Pressable>

          <Div p={10}>
            <Text>Name:</Text>
            <Input
              placeholder="category name..."
              mt={heightPercentageToDP(1)}
              value={categoryName}
              onChangeText={(text) => setCategoryName(text)}
            />
          </Div>
          <Button
            bg={COLOR_PRIMARY}
            ml={widthPercentageToDP(3)}
            w={widthPercentageToDP(94)}
            onPress={addCategory}
          >
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
    backgroundColor: "#fff",
    elevation: 4,
  },
});

export default AddCategory;
