import React from "react";
import { StyleSheet, FlatList, View, RefreshControl } from "react-native";

// Components
import Screen from "../components/Screen";
import BookCard from "../components/BookCard";
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loader";

// Hooks
import useGetBooksCompleteStatus from "../hooks/useGetBooksCompleteStatus";

// RNE
import { Text } from "react-native-elements";

export default function ReadingListScreen() {
  const readingList = useGetBooksCompleteStatus(false);
  return (
    <Screen style={styles.container}>
      {!readingList.isLoading && readingList.data.length === 0 ? (
        <View style={styles.indicator}>
          <Text h3 style={styles.textIndicator}>
            You don't have any book in your reading list
          </Text>
        </View>
      ) : (
        <>
          <SearchInput
            data={readingList.data}
            placeholder="Search Reading List..."
          />
          {readingList.isLoading && !readingList.isMount ? (
            <Loader />
          ) : (
            <FlatList
              style={{ zIndex: -1 }}
              data={readingList.data}
              keyExtractor={(item) => item.docId}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <BookCard book={item} rating />;
              }}
            />
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textIndicator: {
    textAlign: "center",
  },
});
