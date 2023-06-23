import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Router from "./src/routers";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <NavigationContainer>
      <Router />
      <Toast position="top" />
    </NavigationContainer>
  );
}
