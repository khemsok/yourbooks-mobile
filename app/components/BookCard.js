import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// Context
import { useAuth } from "../auth/context";

// Components
import AppImage from "./AppImage";
import GoToPage from "./GoToPage";
import AppRating from "./AppRating";

// RNE
import { Text } from "react-native-elements";

// Navigation
import { useNavigation } from "@react-navigation/native";

// utils
import { getAuthors, getTitle } from "../utils/utils";
import AddOrRemoveButton from "./AddOrRemoveButton";
import firebaseApi from "../api/firebaseApi";
import dayjs from "dayjs";
import { bookBoxShadow } from "../styles/appTheme";

export default function BookCard({ book, completeStatus }) {
  const navigation = useNavigation();
  const { user } = useAuth();

  const {
    docData: {
      data: { authors, title, subtitle, imageLinks },
      bookId,
      rating,
      end,
    },
    docId,
  } = book;

  const handleAddRemoveBook = async (read, book) => {
    if (read) {
      await firebaseApi.removeBookFromDb(book, user);
    } else {
      await firebaseApi.addBookToDb(book.book, user);
    }
    //
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <GoToPage page="Book" bookId={bookId}>
          <AppImage imageLinks={imageLinks} />
        </GoToPage>
      </View>
      <View style={styles.textContainer}>
        <View>
          <GoToPage page="Book" bookId={bookId}>
            <Text h4 style={styles.title}>
              {getTitle(title, subtitle)}
            </Text>
          </GoToPage>
          <Text>{getAuthors(authors)}</Text>
          {completeStatus && (
            <View style={{}}>
              <View style={styles.rating}>
                <AppRating docId={docId} rating={rating} />
              </View>
              <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                Completed on {dayjs(end).format("MMMM DD, YYYY")}
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <AddOrRemoveButton
            book={book}
            handleAddRemoveBook={handleAddRemoveBook}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 200,
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 20,
    width: 130,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  rating: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
});
