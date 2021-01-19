import React from "react";
import { View, StyleSheet } from "react-native";

// RNE
import { Text } from "react-native-elements";

// utils
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

export default function OfflineNotice() {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: 50,
    marginTop: Constants.statusBarHeight,
    // position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: "white",
  },
});
