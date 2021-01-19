import React from "react";

// Navigator
import MainNavigator from "./MainNavigator";

// Screen
import BookScreen from "../screens/BookScreen";

// util
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default AppNavigator = () => (
  <Stack.Navigator initialRouteName="App">
    <Stack.Screen
      name="App"
      component={MainNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Book"
      component={BookScreen}
      options={{ headerTitle: "", headerBackTitle: "Back" }}
    />
  </Stack.Navigator>
);
