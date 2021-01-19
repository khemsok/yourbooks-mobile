import React from "react";

// Context
import AuthProvider from "./app/auth/context";

// Navigations
import Navigator from "./app/navigation/Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./app/navigation/rootNavigation";

// utils
import navigationTheme from "./app/navigation/navigationTheme";
import { ThemeProvider } from "react-native-elements";
import appTheme from "./app/styles/appTheme";
import OfflineNotice from "./app/components/OfflineNotice";

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <AuthProvider>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          <Navigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
