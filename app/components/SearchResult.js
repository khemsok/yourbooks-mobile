import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// Context
import { useAuth } from "../auth/context";

// RNE
import { Text, Image } from "react-native-elements";

// Navigations
import { useNavigation } from "@react-navigation/native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// utils
import { getTitle } from "../utils/utils";
import { setSearchHistory } from "../api/firebaseApi";
import { bookBoxShadow } from "../styles/appTheme";

export default function SearchResult({
  imageLinks,
  title,
  subtitle,
  bookId,
  data,
  user,
  historyVisible,
}) {
  const navigation = useNavigation();

  const handleOnPress = async () => {
    navigation.navigate("Book", {
      bookId: bookId,
    });

    if (user) {
      setSearchHistory(user, bookId, data);
    }
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.resultItemContainer}>
        <View
          style={{
            width: 60,
            marginRight: 5,
            ...bookBoxShadow,
          }}
        >
          <Image
            source={
              imageLinks && imageLinks.smallThumbnail
                ? { uri: imageLinks.smallThumbnail }
                : require("../assets/no_cover.png")
            }
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2}>{getTitle(title, subtitle)}</Text>
        </View>
        {historyVisible && (
          <View style={{ marginHorizontal: 3 }}>
            <MaterialIcons name="history" size={15} color="#515151" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resultItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
  },
  image: {
    height: 50,
    resizeMode: "contain",
  },
});
