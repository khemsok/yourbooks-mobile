import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";

//RNE
import { Text, Button } from "react-native-elements";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import HTML from "react-native-render-html";

export default function DescriptionText({ description, style, length = 300 }) {
  const [isMoreText, setIsMoreText] = useState(false);
  return (
    <View style={styles.container}>
      {description && (
        <>
          <HTML
            source={{
              html: !isMoreText
                ? `${description.slice(0, length)}...`
                : description,
            }}
          />
          {description.length > length && (
            <View style={styles.showMoreContainer}>
              <Button
                title={!isMoreText ? "Show More" : "Show Less"}
                icon={
                  <Ionicons
                    name={!isMoreText ? "chevron-down" : "chevron-up"}
                  />
                }
                titleStyle={styles.showMoreTitle}
                buttonStyle={styles.showMoreButton}
                onPress={() => setIsMoreText((isMore) => !isMore)}
                type="clear"
                TouchableComponent={TouchableOpacity}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  showMoreContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  showMoreTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  showMoreButton: {
    padding: 0,
  },
});

{
  /* <TouchableWithoutFeedback
              onPress={() => setIsMoreText((isMore) => !isMore)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  flexWrap: "wrap",
                }}
              >
                <Ionicons name={!isMoreText ? "chevron-down" : "chevron-up"} />
                <Text style={styles.more}>
                  {!isMoreText ? "Show More" : "Show Less"}
                </Text>
              </View>
            </TouchableWithoutFeedback> */
}
