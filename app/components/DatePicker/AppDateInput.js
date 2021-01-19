import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

// Components

// RNE
import { Text } from "react-native-elements";

// Icons
import { Ionicons } from "@expo/vector-icons";

// utils
import dayjs from "dayjs";
import { updateStartEndDate } from "../../api/firebaseApi";

export default function AppDateInput({ date, handlePress, type, api }) {
  const handleClearDate = () => {
    // update db
    updateStartEndDate(type, null, api.data.docId);
    api.setData({
      ...api.data,
      docData: {
        ...api.data.docData,
        [type]: null,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handlePress(type);
        }}
      >
        <View style={styles.textContainer}>
          <Text>
            {date
              ? dayjs(date).format("MMMM D, YYYY")
              : type === "start"
              ? "Set Start Date"
              : "Set End Date"}
          </Text>
        </View>
      </TouchableOpacity>

      {date ? (
        <TouchableOpacity onPress={handleClearDate}>
          <Ionicons name="close-sharp" size={15} style={styles.icon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
    // width: 130,
  },
  icon: {
    marginLeft: 10,
  },
});
