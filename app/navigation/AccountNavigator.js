import React from "react";

// Screen
import AccountScreen from "../screens/AccountScreen";

// Navigations
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Account" component={AccountScreen} />
  </Stack.Navigator>
);
