import React from "react";

// Screens
import DiscoverScreen from "../screens/DiscoverScreen";
import ReadingListScreen from "../screens/ReadingListScreen";
import FinishedBooksScreen from "../screens/FinishedBooksScreen";

// Navigations
import AccountNavigator from "./AccountNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Discover"
      tabBarOptions={{ keyboardHidesTabBar: true }}
    >
      <Tab.Screen
        name="Reading List"
        component={ReadingListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="reader-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Finished Books"
        component={FinishedBooksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-checkmark-done-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
