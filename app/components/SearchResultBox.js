import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Components

export default function SearchResultBox({ children }) {
  if (children) {
    return (
      <View>
        <View style={styles.searchResultOuterContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.searchResultInnerContainer}>{children}</View>
          </ScrollView>
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  searchResultOuterContainer: {
    position: "absolute",
    width: "100%",
    maxHeight: 250,
    backgroundColor: "white",
    zIndex: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    top: -10,
  },
  searchResultInnerContainer: {
    padding: 10,
  },
});
