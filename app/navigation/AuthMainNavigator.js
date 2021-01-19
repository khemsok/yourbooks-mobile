import React from "react";

// Components
import DiscoverScreen from "../screens/DiscoverScreen";

// Navigations
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/AccountScreen";

// Icons
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default AuthMainNavigator = () => (
  <Tab.Navigator initialRouteName="Discover">
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
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
