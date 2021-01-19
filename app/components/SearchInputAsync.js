import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// RNE
import { Input, Text } from "react-native-elements";

// Context
import { useAuth } from "../auth/context";

// Components
import SearchResult from "./SearchResult";

// Api
import useApi from "../hooks/useApi";
import { getSearchBooks } from "../api/bookApi";
import { getSearchHistory } from "../api/firebaseApi";

// Icons
import { Ionicons } from "@expo/vector-icons";

// utils
import { debounce } from "lodash";
import SearchResultBox from "./SearchResultBox";

export default function SearchInputAsync() {
  const { user } = useAuth();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBooksApi = useApi(getSearchBooks);
  const searchHistoryApi = useApi(getSearchHistory);

  const debounceApi = useCallback(
    debounce((text) => {
      searchBooksApi.request(text);
    }, 150),
    []
  );

  function handleChangeInput(text) {
    setSearchQuery(text);
    debounceApi(text);
  }

  const handleOnFocus = async () => {
    if (user) {
      await searchHistoryApi.request(user);
    }
    setSearchVisible(true);
  };

  return (
    <>
      <Input
        placeholder="Discover new books..."
        onFocus={handleOnFocus}
        onBlur={() => {
          setSearchVisible(false);
        }}
        onChangeText={handleChangeInput}
        value={searchQuery}
        // autoCapitalize={false}
        // autoCompleteType={false}
        // textContentType="name"
        rightIcon={
          searchQuery !== "" && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {searchBooksApi.isLoading && <ActivityIndicator color="black" />}
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery("");
                }}
              >
                <Ionicons name="close-sharp" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          )
        }
        rightIconContainerStyle={{
          padding: 0,
        }}
        style={styles.searchInput}
      />
      {searchVisible &&
        (searchQuery !== "" ? (
          <SearchResultBox>
            {searchBooksApi.data && searchBooksApi.data.length !== 0
              ? searchBooksApi.data.map((result, index) => {
                  const {
                    id,
                    volumeInfo: { title, subtitle, imageLinks },
                  } = result;

                  return (
                    <SearchResult
                      imageLinks={imageLinks}
                      title={title}
                      subtitle={subtitle}
                      bookId={id}
                      key={`${id}-${index}`}
                      data={result.volumeInfo}
                      user={user}
                    />
                  );
                })
              : null}
          </SearchResultBox>
        ) : (
          user &&
          searchHistoryApi.data.length !== 0 && (
            <SearchResultBox>
              {searchHistoryApi.data.map((result, index) => {
                const {
                  bookId,
                  data: { title, subtitle, imageLinks },
                } = result;

                return (
                  <SearchResult
                    imageLinks={imageLinks}
                    title={title}
                    subtitle={subtitle}
                    bookId={bookId}
                    key={`${bookId}-${index}`}
                    data={result}
                    historyVisible
                  />
                );
              })}
            </SearchResultBox>
          )
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: 10,
  },
  searchResultOuterContainer: {
    position: "absolute",
    width: "100%",
    height: 200,
    backgroundColor: "white",
    // zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    top: -10,
  },
  searchResultInnerContainer: {
    padding: 10,
  },
  resultItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
  },
  image: {
    height: 50,
    resizeMode: "contain",
  },
});
