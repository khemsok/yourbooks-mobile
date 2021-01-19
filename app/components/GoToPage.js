import React from "react";
import { TouchableOpacity } from "react-native";

// Navigation
import { useNavigation } from "@react-navigation/native";

export default function GoToPage({ children, page, bookId = null }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(page, bookId !== null ? { bookId: bookId } : null);
      }}
    >
      {children}
    </TouchableOpacity>
  );
}
