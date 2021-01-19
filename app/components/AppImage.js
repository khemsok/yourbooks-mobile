import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, View, StyleSheet } from "react-native";

// RNE
import { bookBoxShadow } from "../styles/appTheme";

export default function AppImage({ imageLinks, style, ratio = 1 }) {
  const [imageSize, setImageSize] = useState({});

  useEffect(() => {
    imageLinks &&
      Image.getSize(imageLinks.thumbnail, (width, height) => {
        setImageSize({ width, height });
      });
  }, []);

  return (
    <View style={styles.imageContainer}>
      <Image
        source={
          imageLinks
            ? { uri: imageLinks.thumbnail }
            : require("../assets/no_cover.png")
        }
        style={[
          Object.keys(imageSize).length !== 0 && imageLinks
            ? {
                width: Number(imageSize.width) * ratio,
                height: Number(imageSize.height) * ratio,
                maxHeight: 200,
              }
            : {},
          style,
        ]}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    ...bookBoxShadow,
  },
});
