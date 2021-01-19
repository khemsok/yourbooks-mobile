import firebaseApi from "../api/firebaseApi";

export default useAddRemoveBook = async (read, book, user, api) => {
  if (read) {
    await firebaseApi.removeBookFromDb(book, user);

    let newData;
    if (Array.isArray(api.data)) {
      newData = api.data.map((item) => {
        if (item.book.id === book.book.id) {
          return {
            book: item.book,
            read: false,
            docId: null,
            docData: null,
          };
        }
        return item;
      });
    } else {
      newData = {
        book: api.data.book,
        read: false,
        docId: null,
        docData: null,
      };
    }

    api.setData(newData);
  } else {
    const { docData, docId } = await firebaseApi.addBookToDb(book.book, user);

    let newData;
    if (Array.isArray(api.data)) {
      newData = api.data.map((item) => {
        if (item.book.id === book.book.id) {
          return {
            book: item.book,
            read: true,
            docId: docId,
            docData: docData,
          };
        }
        return item;
      });
    } else {
      newData = {
        book: api.data.book,
        read: true,
        docId: docId,
        docData: docData,
      };
    }

    api.setData(newData);
  }
};
