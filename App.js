import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { colors } from "./utils/Colors";
import { PlannerContext, PlannerProvider } from "./contexts/PlannerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Invitations from "./screens/Invitations";
import TodoList from "./screens/TodoList";
import GuestList from "./screens/GuestList";
import Playlist from "./screens/Playlist";
import PlaylistDetails from "./screens/PlaylistDetails";
import Invite from "./components/Invite";
import Invite2 from "./components/Invite2";
import Invite3 from "./components/Invite3";
import Invite4 from "./components/Invite4";
import Planner from "./screens/Planner";
import VenueCurrent from "./components/VenueCurrent";
import VenueCustom from "./components/VenueCustom";
import Venue from "./screens/Venue";
import { LogBox } from "react-native";
import Seating from "./screens/Seating";
import ModeSwitch from "./components/ModeSwitch";
import React, { useContext, useEffect, useState } from "react";
import Splash from "./screens/Splash";
import * as Animatable from "react-native-animatable";

export default function App() {
  const Stack = createNativeStackNavigator();
  const bottomTabs = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  },[]);

  let [fontsLoaded] = useFonts({
    Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
    "Sacramento-Regular": require("./assets/fonts/Sacramento-Regular.ttf"),
    "Sofia-Regular": require("./assets/fonts/Sofia-Regular.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    amatic: require("./assets/fonts/AmaticSC-Bold.ttf"),
    montez: require("./assets/fonts/Montez-Regular.ttf"),
    Parisienne: require("./assets/fonts/Parisienne-Regular.ttf"),
  });

  console.disableYellowBox = true;
  LogBox.ignoreAllLogs();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const Tabs = () => {
    const plannerContext = useContext(PlannerContext);
    return (
      <bottomTabs.Navigator screenOptions={{
        tabBarStyle:{
          backgroundColor: plannerContext.modeLight
            ? colors.white
            : colors.secondary200Dark,
            elevation: 4,
              shadowColor: plannerContext.modeLight
                ? colors.gray
                : colors.black,
              shadowOffset: { height: 2, width: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
        },
      }}>
        <bottomTabs.Screen
          name="Home Screen"
          component={Home}
          options={{
            tabBarIcon: () => (
              <Ionicons name="home" color={plannerContext.modeLight? colors.action :colors.white} size={22} />
            ),
            tabBarActiveTintColor: plannerContext.modeLight?colors.actionDark: colors.white,
            headerTitleStyle: {
              color: plannerContext.modeLight ? colors.action200 : colors.white,
              fontFamily: "Pacifico",
            },
            headerTitle: "Event Buddy",
            headerStyle: {
              backgroundColor: plannerContext.modeLight
                ? colors.white
                : colors.secondary200Dark,
              elevation: 4,
              shadowColor: plannerContext.modeLight
                ? colors.gray
                : colors.black,
              shadowOffset: { height: 2, width: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            },
            headerRight: () => <ModeSwitch></ModeSwitch>,
          }}
        />
        <bottomTabs.Screen
          name="Planner Screen"
          component={Planner}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="library"
                color={plannerContext.modeLight? colors.action:colors.white}
                size={22}
              ></Ionicons>
            ),
            tabBarActiveTintColor:plannerContext.modeLight?colors.actionDark:colors.white,
            headerTitleStyle: {
              color: plannerContext.modeLight ? colors.action200 : colors.white,
              fontFamily: "Pacifico",
            },
            headerStyle: {
              backgroundColor: plannerContext.modeLight
                ? colors.white
                : colors.secondary200Dark,
              elevation: 4,
              shadowColor: plannerContext.modeLight
                ? colors.gray
                : colors.black,
              shadowOffset: { height: 2, width: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
            },
            headerTitle: "Digital Planner",
            headerRight: () => <ModeSwitch></ModeSwitch>,
          }}
        ></bottomTabs.Screen>
      </bottomTabs.Navigator>
    );
  };

  const Nav = () => {
    const plannerContext = useContext(PlannerContext);
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            title: "EventBuddy",
            headerTitleStyle: {
              color: plannerContext.modeLight ? colors.action200 : colors.white,
              fontFamily: "Pacifico",
            },
            headerStyle: {
              backgroundColor: plannerContext.modeLight
                ? colors.white
                : colors.secondary200Dark,
            },
            headerRight: () => <ModeSwitch></ModeSwitch>,
          })}
        >
          <Stack.Screen
            name="Home Planner Tab"
            component={Tabs}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Venue Home" component={Venue}></Stack.Screen>
          <Stack.Screen
            name="Venue Current"
            component={VenueCurrent}
          ></Stack.Screen>
          <Stack.Screen
            name="Venue Custom"
            component={VenueCustom}
          ></Stack.Screen>
          <Stack.Screen
            name="Invitation Screen"
            component={Invitations}
          ></Stack.Screen>
          <Stack.Screen
            name="Todo List Screen"
            component={TodoList}
          ></Stack.Screen>
          <Stack.Screen
            name="Guest List Screen"
            component={GuestList}
          ></Stack.Screen>
          <Stack.Screen
            name="Seating Screen"
            component={Seating}
          ></Stack.Screen>
          <Stack.Screen
            name="Playlist Screen"
            component={Playlist}
          ></Stack.Screen>
          <Stack.Screen
            name="Playlist Details"
            component={PlaylistDetails}
          ></Stack.Screen>
          <Stack.Screen name="Invite 1" component={Invite}></Stack.Screen>
          <Stack.Screen name="Invite 2" component={Invite2}></Stack.Screen>
          <Stack.Screen name="Invite 3" component={Invite3}></Stack.Screen>
          <Stack.Screen name="Invite 4" component={Invite4}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return isLoading ? (
    <Splash />
  ) : (
    <Animatable.View
      animation="fadeIn" 
      duration={1000} 
      style={{ width: "100%", height: "100%" }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <PlannerProvider>
          <Nav></Nav>
        </PlannerProvider>
      </GestureHandlerRootView>
    </Animatable.View>
  );
}
