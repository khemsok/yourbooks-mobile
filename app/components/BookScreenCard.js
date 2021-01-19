import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { Text, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

// Components
import AppRating from "../components/AppRating";
import AppDatePicker from "../components/DatePicker/AppDatePicker";
import AppImage from "./AppImage";
import AddOrRemoveButton from "./AddOrRemoveButton";
import DescriptionText from "./DescriptionText";

// Context
import { useAuth } from "../auth/context";

// utils
import {
  getAuthors,
  getBookDetail,
  getTitle,
  estReadingTime,
} from "../utils/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useHeaderHeight } from "@react-navigation/stack";
import NotesInput from "./NotesInput";

export default function BookScreenCard({ bookScreenApi, handleAddRemoveBook }) {
  const { user } = useAuth();
  const textRef = React.useRef(null);
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
        pageCount,
      },
    },
    docData,
    docId,
    read,
  } = bookScreenApi.data;

  const handleUpdateRating = (newRating) => {
    bookScreenApi.setData({
      ...bookScreenApi.data,
      docData: {
        ...bookScreenApi.data.docData,
        rating: newRating,
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      getTextInputRefs={() => [textRef]}
      extraScrollHeight={useHeaderHeight()}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <AppImage imageLinks={imageLinks} style={styles.image} />
        <View>
          <Text h3 style={styles.title}>
            {getTitle(title, subtitle)}
          </Text>
          <Text style={styles.authors}>{getAuthors(authors)}</Text>
          <Text style={styles.bookDetail}>
            {getBookDetail(publishedDate, categories, averageRating)}
          </Text>
          {user && read && (
            <>
              {pageCount && (
                <Text style={styles.estReadingTime}>
                  {estReadingTime(pageCount)}
                </Text>
              )}
              <View style={styles.rating}>
                <AppRating
                  docId={docId}
                  rating={docData.rating}
                  setData={handleUpdateRating}
                />
              </View>
              <View style={styles.datePicker}>
                <AppDatePicker api={bookScreenApi} />
              </View>
            </>
          )}
          <DescriptionText description={description} />
          {user && (
            <View style={styles.addRemoveButtonContainer}>
              <AddOrRemoveButton
                book={bookScreenApi.data}
                handleAddRemoveBook={handleAddRemoveBook}
              />
            </View>
          )}
          {user && read && (
            <NotesInput
              initialNotes={docData.notes}
              textRef={textRef}
              docId={docId}
            />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  image: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  addRemoveButtonContainer: {
    alignItems: "flex-end",
  },
  authors: {
    marginBottom: 10,
  },
  bookDetail: {
    marginBottom: 10,
    fontStyle: "italic",
  },
  estReadingTime: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  rating: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  datePicker: {
    marginBottom: 15,
  },
});
