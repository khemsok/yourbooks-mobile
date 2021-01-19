import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Image } from "react-native-elements";

// Components
import Screen from "../components/Screen";

// Auth
import { useAuth } from "../auth/context";

// Icons
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen({ navigation }) {
  const { signIn, signOut, user, isLoading } = useAuth();
  const displayAccountScreen = user ? (
    <>
      <Text h4 style={styles.text}>
        Welcome, <Text style={{ fontWeight: "bold" }}>{user.displayName}</Text>
      </Text>
      {/* <View style={styles.imageContainer}>
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 75, height: 75, borderRadius: 75 / 2 }}
        />
      </View> */}
      <View style={{ alignItems: "center" }}>
        <Button
          title="Sign Out"
          style={styles.button}
          icon={<Ionicons name="log-out-outline" size={25} color="white" />}
          loading={isLoading}
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </>
  ) : (
    <>
      <Text h4 style={styles.text}>
        Please Sign In
      </Text>
      <View style={{ alignItems: "center" }}>
        <Button
          title="Sign In"
          style={styles.button}
          icon={<Ionicons name="log-in-outline" size={25} color="white" />}
          loading={isLoading}
          onPress={() => {
            signIn();
          }}
        />
      </View>
    </>
  );

  return (
    <Screen>
      <View style={styles.container}>{displayAccountScreen}</View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  text: {
    textAlign: "center",
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    width: 200,
  },
});
