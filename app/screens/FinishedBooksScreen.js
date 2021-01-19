import React from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Text } from "react-native-elements";

// Components
import Screen from "../components/Screen";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";

// Hooks
import useGetBooksCompleteStatus from "../hooks/useGetBooksCompleteStatus";
import SearchInput from "../components/SearchInput";

export default function FinishedBooksScreen() {
  const finishedBooks = useGetBooksCompleteStatus(true);

  return (
    <Screen style={styles.container}>
      {!finishedBooks.isLoading && finishedBooks.data.length === 0 ? (
        <View style={styles.indicator}>
          <Text h3 style={styles.textIndicator}>
            You haven't finished any books :(
          </Text>
        </View>
      ) : (
        <>
          <SearchInput
            data={finishedBooks.data}
            placeholder="Search Finished Books..."
          />
          {finishedBooks.isLoading && !finishedBooks.isMount ? (
            <Loader />
          ) : (
            <FlatList
              style={{ zIndex: -1 }}
              data={finishedBooks.data}
              keyExtractor={(item) => item.docId}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <BookCard book={item} completeStatus />;
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
