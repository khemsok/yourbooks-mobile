import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

// RNE
import { Input } from "react-native-elements";

// Icons
import { Ionicons } from "@expo/vector-icons";

// utils
import { bookFilter, getTitle } from "../utils/utils";
import SearchResultBox from "./SearchResultBox";
import SearchResult from "./SearchResult";

export default function SearchInput({ data, placeholder }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      const tempBooks = data.map((book) => {
        const {
          data: { title, subtitle, imageLinks },
          bookId,
        } = book.docData;

        const fullTitle = getTitle(title, subtitle);
        return {
          title,
          subtitle,
          imageLinks,
          fullTitle,
          bookId,
        };
      });
      setBooks(tempBooks);
    }
  }, [data]);

  const handleChangeInput = (text) => {
    setSearchQuery(text);
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        onFocus={() => {
          setSearchVisible(true);
        }}
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
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
              }}
            >
              <Ionicons name="close-sharp" />
            </TouchableOpacity>
          )
        }
        rightIconContainerStyle={{
          padding: 0,
        }}
        style={styles.searchInput}
      />
      {searchVisible && (
        <SearchResultBox>
          {books.length !== 0 && bookFilter(books, searchQuery).length !== 0
            ? bookFilter(books, searchQuery).map((result, index) => {
                const { title, subtitle, imageLinks, bookId } = result;
                return (
                  <SearchResult
                    imageLinks={imageLinks}
                    title={title}
                    subtitle={subtitle}
                    bookId={bookId}
                    key={`${bookId}-${index}`}
                  />
                );
              })
            : null}
        </SearchResultBox>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginBottom: 10,
  },
});
