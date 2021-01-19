import React from "react";

// Navigator
import AuthMainNavigator from "./AuthMainNavigator";

// Screen
import BookScreen from "../screens/BookScreen";

// util
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default AuthAppNavigator = () => (
  <Stack.Navigator initialRouteName="App">
    <Stack.Screen
      name="App"
      component={AuthMainNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Book"
      component={BookScreen}
      options={{ headerTitle: "", headerBackTitle: "Back" }}
    />
  </Stack.Navigator>
);
