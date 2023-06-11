import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../components/Login/Welcome";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabbarIcon from "../helper/TabbarIcon";
import Status from "../components/Status";
import CalendarComponent from "../components/Calendar";
import Settings from "../components/Settings";
import { COLOR_PRIMARY } from "../helper/theme";

const EntryStack = createStackNavigator();

//Main EntryStack Belum ada detect loginnya

export const Router = () => {
  return (
    <NavigationContainer>
      <EntryStack.Navigator>
        <EntryStack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <EntryStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <EntryStack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <EntryStack.Screen
          name="Dashboard"
          component={MyBot}
          options={{
            headerShown: false,
          }}
        />
      </EntryStack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();

const MyBot = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLOR_PRIMARY,
      },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: "My Reminder",
        headerTitleAlign: "center",
        tabBarLabel: "",
        tabBarIcon: ({ focused }) => (
          <TabbarIcon
            routeName="Home"
            focused={focused}
            iconName="home"
            iconFrom=""
          />
        ),
      }}
    />
    <Tab.Screen
      name="Status"
      component={Status}
      options={{
        tabBarLabel: "",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabbarIcon
            routeName="Status"
            focused={focused}
            iconName="progress-check"
            iconFrom="MaterialCommunityIcons"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarComponent}
      options={{
        title: "Calendar",
        headerTitleAlign: "center",
        tabBarLabel: "",
        tabBarIcon: ({ focused }) => (
          <TabbarIcon
            routeName="Calendar"
            focused={focused}
            iconName="calendar"
            iconFrom=""
          />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarLabel: "",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabbarIcon
            routeName="Settings"
            focused={focused}
            iconName="settings"
            iconFrom="Feather"
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Router;
