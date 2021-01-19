import { db, awsApiKey, awsRecommenderUrl } from "../auth/appConfig";

import { checkBookReadStatus } from "./firebaseApi";

export const getDiscoverBooks = async (
  numResults = 10,
  query = "subject:classics"
) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${numResults}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const books = data.items.map((book) => ({
      book: book,
      read: null,
      docId: null,
      docData: null,
    }));

    return { data: books, ok: true, error: null };
  } catch (error) {
    return { ok: false, error: error };
  }
};

/*
  Data return:
  [{
    book: {...},
    docId: <string>,
    read: <boolean>,
    docData: {...}
  }, 
  {...}]
*/
export const getDiscoverBooksUser = async (user) => {
  // const { ok, data } = await getDiscoverBooks();
  // if (ok && user) {
  //   const newData = data.map((book) => book.book);
  //   const books = await checkBookReadStatus(newData, user);
  //   return { data: books, ok: true, error: null };
  // } else {
  //   return {
  //     ok: false,
  //     error: "Something went wrong",
  //   };
  // }

  if (user) {
    try {
      const snapshot = await db
        .collection("books")
        .where("userId", "==", user.uid)
        // .limit(10)
        .get();
      if (!snapshot.empty) {
        let data = [];
        let isbnList = [];
        snapshot.forEach((doc) => {
          let {
            data: { description, authors, industryIdentifiers: isbnId },
          } = doc.data();
          if (description) {
            data.push([
              description.replace(/(<([^>]+)>)/gi, " "),
              authors ? authors.join(" ") : "",
            ]);
          }
          if (isbnId) {
            let isbn;
            if (isbnId.length > 1) {
              isbn =
                isbnId[0]["type"] === "ISBN_10"
                  ? isbnId[0]["identifier"]
                  : isbnId[1]["identifier"];
              isbnList.push(isbn);
            } else {
              if (isbnId[0]["type"] === "ISBN_10") {
                isbnList.push(isbnId[0]["identifier"]);
              }
            }
          }
        });

        let bagOfWords = data.join(" ");

        let bodyData = {
          isbn_list: isbnList,
          bag_of_words: bagOfWords,
        };
        const url = awsRecommenderUrl;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": awsApiKey,
          },
          body: JSON.stringify(bodyData),
        });

        const recommendedIsbn = await response.json();

        const LENGTH = 10;
        let rawBooks = await Promise.all(
          recommendedIsbn["isbn"].slice(0, LENGTH).map(async (isbn) => {
            const googleBookUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
            const res = await fetch(googleBookUrl);
            return await res.json();
          })
        );

        const extractBooks = [];
        for (const book of rawBooks) {
          if (book.items && book.items[0]) {
            extractBooks.push(book.items[0]);
          }
        }

        const books = await checkBookReadStatus(extractBooks, user);

        return { data: books, ok: true, error: null };
      } else {
        const { ok, data, error } = await getDiscoverBooks(10);
        if (ok) {
          const newData = data.map((book) => book.book);
          const books = await checkBookReadStatus(newData, user);
          return { data: books, ok: true, error: null };
        } else {
          return {
            ok: false,
            error: error,
          };
        }
      }
    } catch (err) {
      console.error(err);
      return { data: [], ok: false, error: err };
    }
  }
};

export const getBook = async (bookId) => {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const book = {
      book: data,
      read: null,
      docId: null,
      docData: null,
    };
    return { data: book, ok: true, error: null };
  } catch (err) {
    return { ok: false, error: err };
  }
};

export const getBookUser = async (bookId, user) => {
  const { ok, data, error } = await getBook(bookId);
  if (ok && user) {
    const newData = data.book;
    const book = await checkBookReadStatus(newData, user);
    return { data: book, ok: true, error: null };
  } else {
    return {
      ok: false,
      error: error,
    };
  }
};

export const getSearchBooks = async (query) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.items) {
      return { data: data.items, ok: true, error: null };
    } else {
      return { data: [], ok: true, error: null };
    }
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
};

export default {
  getDiscoverBooks,
  getDiscoverBooksUser,
  getBook,
  getBookUser,
  getSearchBooks,
};
