import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// Components

//RNE
import { Button, Overlay } from "react-native-elements";

// utils
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { updateStartEndDate } from "../../api/firebaseApi";
import dayjs from "dayjs";

export default function AppDateSelect({
  visible,
  setVisible,
  type,
  date,
  api,
}) {
  const handleSave = (date) => {
    setVisible(false);

    const newDate = dayjs(date).format("MM/DD/YYYY");

    updateStartEndDate(type, newDate, api.data.docId);

    api.setData({
      ...api.data,
      docData: {
        ...api.data.docData,
        [type]: newDate,
      },
    });
  };

  return (
    <DateTimePickerModal
      isVisible={visible}
      mode="date"
      onConfirm={handleSave}
      onCancel={() => {
        setVisible(false);
      }}
    />
  );
}

const styles = StyleSheet.create({
  groupedButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
