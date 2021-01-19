import { db } from "../auth/appConfig";

import dayjs from "dayjs";

export const checkBookReadStatus = async (bookItem, user) => {
  if (Array.isArray(bookItem)) {
    const bookData = {};
    for (let book of bookItem) {
      bookData[book.id] = {
        book: book,
        read: false,
        docId: null,
        docData: null,
      };
    }

    if (user) {
      const bookIds = Object.keys(bookData);
      const docs = await db
        .collection("books")
        .where("userId", "==", user.uid)
        .where("bookId", "in", bookIds)
        .get();

      docs.docs.map((doc) => {
        let bookId = doc.data()["bookId"];
        let docId = doc.id;
        if (bookIds.includes(bookId)) {
          bookData[bookId]["read"] = true;
          bookData[bookId]["docId"] = docId;
          bookData[bookId]["docData"] = doc.data();
        }
      });
    }
    return Object.keys(bookData).map((bookId) => bookData[bookId]);
  } else {
    if (user) {
      const doc = await db
        .collection("books")
        .where("userId", "==", user.uid)
        .where("bookId", "==", bookItem.id)
        .limit(1)
        .get();
      return {
        book: bookItem,
        read: !doc.empty,
        docId: !doc.empty ? doc.docs[0].id : null,
        docData: !doc.empty ? doc.docs[0].data() : null,
      };
    }
  }
};

export const addBookToDb = async (book, user) => {
  try {
    const doc = await db
      .collection("books")
      .where("bookId", "==", book.id)
      .where("userId", "==", user.uid)
      .limit(1)
      .get();
    let docRef;
    if (doc.empty) {
      const docData = {
        bookId: book.id,
        data: book.volumeInfo,
        start: dayjs().format("MM/DD/YYYY"),
        end: "",
        userId: user.uid,
        rating: 0,
        completeStatus: false,
        notes: "",
      };
      docRef = await db.collection("books").add(docData);
      return { docData: docData, docId: docRef.id };
    } else {
      return { docData: doc.docs[0].data(), docId: doc.docs[0].id };
    }
  } catch (err) {
    console.error(err);
  }
};

export const removeBookFromDb = async (book, user) => {
  try {
    await db.doc(`/books/${book.docId}`).delete();
  } catch (err) {
    console.error(err);
  }
};

export const getBookFromDb = async (bookId, user) => {
  try {
    const doc = await db
      .collection("books")
      .where("bookId", "==", bookId)
      .where("userId", "==", user.uid)
      .limit(1)
      .get();
    if (!doc.empty) {
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateRating = async (rating, docId) => {
  try {
    await db.doc(`/books/${docId}`).update({ rating: rating });
  } catch (err) {
    console.error(err);
  }
};

export const updateStartEndDate = async (type, date, docId) => {
  try {
    if (type === "start") {
      await db.doc(`/books/${docId}`).update({ [type]: date });
    } else {
      await db
        .doc(`/books/${docId}`)
        .update({ [type]: date, completeStatus: date === null ? false : true });
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateNotes = async (notes, docId) => {
  try {
    await db.doc(`/books/${docId}`).update({ notes: notes });

    return { data: "", ok: true };
  } catch (err) {
    console.error(err);
    return { ok: true };
  }
};

export const getSearchHistory = async (user) => {
  if (user) {
    const userId = user.uid;
    try {
      const doc = await db.collection("users").doc(userId).get();
      if (doc.exists) {
        const docData = doc.data();
        if (docData.searchHistory) {
          const distinctSearchHistory = (data) => {
            const checkBookId = [];
            const distinctSearchResult = [];
            for (const item of data) {
              const { bookId } = item;
              if (!checkBookId.includes(bookId)) {
                checkBookId.push(bookId);
                distinctSearchResult.push(item);
              }
            }
            return distinctSearchResult;
          };

          const searchHistory = distinctSearchHistory(docData.searchHistory);

          return { data: searchHistory, ok: true };
        } else {
          return { data: [], ok: true };
        }
      } else {
        return { data: [], ok: true };
      }
    } catch (err) {
      console.error(err);
      return { data: [], ok: false, error: err };
    }
  }
};

export const setSearchHistory = async (user, bookId, data) => {
  if (user) {
    const userId = user.uid;
    const doc = await db.collection("users").doc(userId).get();

    if (doc.exists) {
      const docData = doc.data();

      if (docData.searchHistory) {
        // push to the beginning
        docData.searchHistory.unshift({
          bookId: bookId,
          data: data,
          timestamp: new Date(),
        });
        await db
          .collection("users")
          .doc(userId)
          .set({
            ...docData,
            searchHistory: docData.searchHistory,
          });
      } else {
        await db
          .collection("users")
          .doc(userId)
          .set({
            ...docData,
            searchHistory: [
              {
                bookId,
                data: data,
                timestamp: new Date(),
              },
            ],
          });
      }
    } else {
      const searchHistory = [
        {
          bookId: bookId,
          data: data,
          timestamp: new Date(),
        },
      ];

      await db
        .collection("users")
        .doc(userId)
        .set({ searchHistory: searchHistory });
    }
  }
};

// export const getBooksWhereCompleteStatus = async (user, completeStatus) => {
//   try{
//     const books =
//   }catch(err){
//     console.error(err)
//   }
// }

export default { checkBookReadStatus, addBookToDb, removeBookFromDb };
