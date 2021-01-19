import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

// Components

// RNE
import { Button, Overlay, Text } from "react-native-elements";

import Modal from "react-native-modal";

// Icons
import { Ionicons } from "@expo/vector-icons";

export default function AddOrRemoveButton({ book, handleAddRemoveBook }) {
  const { read } = book;

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible((state) => !state);
  };

  const handleButtonPress = () => {
    if (read) {
      toggleOverlay();
    } else {
      handleAddRemoveBook(read, book);
    }
  };

  const handleDelete = () => {
    toggleOverlay();
    handleAddRemoveBook(read, book);
  };
  return (
    <>
      <Button
        style={styles.addRemoveButton}
        titleStyle={styles.addRemoveButtonTitle}
        type="clear"
        title={read ? "Remove from Reading List" : "Add to Reading List"}
        icon={read ? <Ionicons name="remove" /> : <Ionicons name="add" />}
        TouchableComponent={TouchableOpacity}
        onPress={handleButtonPress}
      />
      <Modal
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        animationIn="zoomIn"
        animationOut="fadeOut"
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
      >
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <Text h3 style={styles.overlayTitle}>
            Are you sure you want to delete this book?
          </Text>
          <Text h4 style={styles.overlaySubtitle}>
            Once delete, you cannot recover the saved data.
          </Text>
          <View style={styles.overlayButtonContainer}>
            <Button
              title="Cancel"
              buttonStyle={[styles.overlayButton, { marginRight: 30 }]}
              titleStyle={[styles.overlayTitleButton]}
              onPress={toggleOverlay}
              TouchableComponent={TouchableOpacity}
              type="clear"
            />
            <Button
              title="Delete"
              buttonStyle={styles.overlayButton}
              titleStyle={[styles.overlayTitleButton, { color: "red" }]}
              onPress={handleDelete}
              TouchableComponent={TouchableOpacity}
              // icon={<Ionicons name="trash-bin-outline" />}
              type="clear"
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addRemoveButton: {
    width: 150,
  },
  addRemoveButtonTitle: {
    fontSize: 10,
  },
  overlayTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 15,
  },
  overlaySubtitle: {
    color: "#757575",
    marginBottom: 25,
  },
  overlayButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  overlayButton: { padding: 3 },
  overlayTitleButton: {
    fontSize: 14,
    fontWeight: "500",
  },
});
