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
import AddCategory from "../components/Dashboard/addCategory";
import Task from "../components/Dashboard/Task";
import ForgotPassword from "../components/ForgetPassword/ForgotPassword";
import NewPassword from "../components/ForgetPassword/NewPassword";
import CardDetail from "../components/Dashboard/CardDetail";
import EditProfile from "../components/Profile";

const EntryStack = createStackNavigator();

//Main EntryStack Belum ada detect loginnya

export const Router = () => {
  return (
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
          name="Forget"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <EntryStack.Screen
          name="NewPass"
          component={NewPassword}
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
      component={Home}
      options={{      
        tabBarLabel: "",
        headerShown: false,
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
        title: "Status",
        headerTitleAlign: 'center',        
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
      component={Profile}
      options={{
        headerShown: false,   
        tabBarLabel: "",         
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

const MainDash = createStackNavigator()

const Home = () => (
    <MainDash.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: COLOR_PRIMARY,        
      },
      headerTitleAlign: 'center'
    }}>
      <MainDash.Screen 
        name="Home"
        component={Dashboard}
        options={{          
          title: "My Reminder",          
          headerLeft: () => null     
        }}
      />
      <MainDash.Screen 
        name="Category"
        component={AddCategory}
        options={{
          title: 'Category'
        }}
      />
      <MainDash.Screen 
        name="Task"
        component={Task}
        options={{
          title: 'Create Task'
        }}
      />
      <MainDash.Screen 
        name="TaskDetail"
        component={CardDetail}
        options={{
          title: 'Update Task'
        }}
      />
    </MainDash.Navigator>
)

const ProfileDash = createStackNavigator()

const Profile = () => (
    <ProfileDash.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: COLOR_PRIMARY,        
      },
      headerTitleAlign: 'center'
    }}>
      <ProfileDash.Screen 
        name="Settings"
        component={Settings}
        options={{                    
          title: 'My Profile',        
          headerLeft: () => null  
        }}
      />
      <ProfileDash.Screen 
        name="Profile"
        component={EditProfile}
        options={{                    
          title: 'Edit Profile',                  
        }}
      />
      
    </ProfileDash.Navigator>
)

export default Router;
