import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

// Components
import AppDateInput from "./AppDateInput";

// RNE
import { Text, Button, Overlay } from "react-native-elements";

// Icons
import { Ionicons } from "@expo/vector-icons";

//  utils
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import AppDateSelect from "./AppDateSelect";

export default function AppDatePicker({ api }) {
  const {
    docData: { end, start },
  } = api.data;

  const [visible, setVisible] = useState(false);
  const [datePicked, setDatePicked] = useState();
  const [dateType, setDateType] = useState();

  const handlePress = (type) => {
    setDateType(type);
    setDatePicked(type === "start" ? start : end);
    setVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <AppDateInput
          date={start}
          handlePress={handlePress}
          type="start"
          api={api}
        />
        <View style={{ marginHorizontal: 20 }} />
        <AppDateInput
          date={end}
          handlePress={handlePress}
          type="end"
          api={api}
        />
      </View>
      <AppDateSelect
        visible={visible}
        setVisible={setVisible}
        date={datePicked}
        type={dateType}
        api={api}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
