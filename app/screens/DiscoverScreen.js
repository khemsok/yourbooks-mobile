import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

// Context
import { useAuth } from "../auth/context";

// Components
import Screen from "../components/Screen";
import BookCardDescription from "../components/BookCardDescription";
import SearchInputAsync from "../components/SearchInputAsync";

// Hooks
import useApi from "../hooks/useApi";
import useAddRemoveBook from "../hooks/useAddRemoveBook";

// Api
import bookApi from "../api/bookApi";

export default function DiscoverScreen({ navigation }) {
  const { user } = useAuth();
  const discoverApi = useApi(
    user ? bookApi.getDiscoverBooksUser : bookApi.getDiscoverBooks
  );
  useEffect(() => {
    if (user) {
      discoverApi.request(user);

      const unsubscribe = navigation.addListener("focus", (payload) => {
        // console.log(payload, "testing.....");
        discoverApi.request(user);
      });

      return unsubscribe;
    } else {
      discoverApi.request();
    }
  }, [user]);

  const handleAddRemoveBook = async (read, book) => {
    useAddRemoveBook(read, book, user, discoverApi);
  };

  return (
    <Screen style={styles.container}>
      {/* <ActivityIndicator visible={discoverApi.isLoading} /> */}
      <SearchInputAsync />
      <FlatList
        style={{ zIndex: -1 }}
        data={discoverApi.data}
        keyExtractor={(item) => item.book.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() =>
              user ? discoverApi.request(user) : discoverApi.request()
            }
            refreshing={discoverApi.isLoading}
          />
        }
        renderItem={({ item }) => {
          return (
            <BookCardDescription
              book={item}
              handleAddRemoveBook={handleAddRemoveBook}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ marginBottom: 30 }} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
