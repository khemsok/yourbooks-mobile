import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

// Auth
import { useAuth } from "../auth/context";

//RNE
import { Text } from "react-native-elements";

// Components
import AddOrRemoveButton from "./AddOrRemoveButton";

// util
import { getAuthors, getTitle, getBookDetail } from "../utils/utils";
import { addBookToDb } from "../api/firebaseApi";
import { useNavigation } from "@react-navigation/native";
import AppImage from "./AppImage";
import DescriptionText from "./DescriptionText";
import GoToPage from "./GoToPage";
import { bookBoxShadow } from "../styles/appTheme";

export default function BookCardDescription({ book, handleAddRemoveBook }) {
  const { user } = useAuth();
  const navigation = useNavigation();

  const {
    book: {
      id: bookId,
      volumeInfo: {
        title,
        subtitle,
        description,
        imageLinks,
        authors,
        publishedDate,
        categories,
        averageRating,
      },
    },
    read,
  } = book;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <GoToPage page="Book" bookId={bookId}>
          <Image
            source={
              imageLinks
                ? { uri: imageLinks.thumbnail }
                : require("../assets/no_cover.png")
            }
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        </GoToPage>
      </View>
      <View style={styles.textContainer}>
        <GoToPage page="Book" bookId={bookId}>
          <Text h3 style={styles.title}>
            {getTitle(title, subtitle)}
          </Text>
        </GoToPage>
        <Text style={styles.authors}>{getAuthors(authors)}</Text>
        <Text style={styles.bookDetail}>
          {getBookDetail(publishedDate, categories, averageRating)}
        </Text>

        <DescriptionText description={description} length={100} />

        {user && (
          <View style={{ alignItems: "flex-end" }}>
            <AddOrRemoveButton
              book={book}
              handleAddRemoveBook={handleAddRemoveBook}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageContainer: {
    width: 100,
    marginRight: 20,
    ...bookBoxShadow,
  },

  image: {
    width: "100%",
    // height: "100%",
    height: 160,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  authors: {
    marginBottom: 10,
  },
  bookDetail: {
    marginBottom: 10,
    fontStyle: "italic",
  },
  more: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});
