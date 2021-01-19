import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
} from "react-native";

// Components

// RNE
import { Input } from "react-native-elements";

// db
import useApi from "../hooks/useApi";
import { updateNotes } from "../api/firebaseApi";

// utils
import { debounce } from "lodash";

export default function NotesInput({ initialNotes, textRef, docId }) {
  const [notes, setNotes] = useState(initialNotes);

  const updateNotesApi = useApi(updateNotes, 1000);

  const debounceApi = useCallback(
    debounce((text) => {
      updateNotesApi.request(text, docId);
    }, 1000),
    []
  );

  const handleChangeInput = (text) => {
    setNotes(text);
    debounceApi(text);
  };

  return (
    <Input
      placeholder="Type your notes..."
      multiline
      ref={textRef}
      value={notes}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      onChangeText={handleChangeInput}
      rightIcon={
        updateNotesApi.isLoading && (
          <ActivityIndicator size="small" color="black" />
        )
      }
      rightIconContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      inputStyle={{ fontSize: 14 }}
      containerStyle={styles.textInput}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    minHeight: 75,
    padding: 10,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
});
