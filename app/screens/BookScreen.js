import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Screens
import Screen from "../components/Screen";

// Context
import { useAuth } from "../auth/context";

// Components
import BookScreenCard from "../components/BookScreenCard";
import Loader from "../components/Loader";

// RNE
import { Text } from "react-native-elements";

// utils
import useApi from "../hooks/useApi";
import bookApi from "../api/bookApi";
import useAddRemoveBook from "../hooks/useAddRemoveBook";

export default function BookScreen({ route }) {
  const { bookId } = route.params;

  const { user } = useAuth();

  const bookScreenApi = useApi(user ? bookApi.getBookUser : bookApi.getBook);

  useEffect(() => {
    bookScreenApi.request(bookId, user);
  }, []);

  const handleAddRemoveBook = async (read, book) => {
    useAddRemoveBook(read, book, user, bookScreenApi);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {bookScreenApi.isLoading || !bookScreenApi.data || !bookId ? (
          <Loader />
        ) : (
          <>
            <BookScreenCard
              bookScreenApi={bookScreenApi}
              handleAddRemoveBook={handleAddRemoveBook}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
