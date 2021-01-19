import React, { useState } from "react";
import { StyleSheet } from "react-native";

//RNE
import { Overlay, Text, Button } from "react-native-elements";

export default function BookDeleteAlert() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible((state) => !state);
  };
  return (
    <Overlay isVisible={visible} onPress={toggleOverlay}>
      <Text h3>Are you sure you want to delete this book?</Text>
      <Text h4>Once delete, you cannot recover the saved data.</Text>
      <View>
        <Button
          title="No"
          buttonStyle={styles.button}
          onPress={toggleOverlay}
        />
        <Button
          title="Yes"
          buttonStyle={styles.button}
          onPress={toggleOverlay}
        />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 75,
    padding: 3,
  },
});
