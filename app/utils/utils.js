import dayjs from "dayjs";
import { db } from "../auth/appConfig";

export const getTitle = (title, subtitle) => {
  if (subtitle) {
    return `${title}: ${subtitle}`;
  } else {
    return title;
  }
};

export const getAuthors = (authors) => {
  if (authors) {
    return authors.join(", ");
  }
};

export const getBookDetail = (publishedDate, categories, averageRating) => {
  return [
    dayjs(publishedDate).format("YYYY"),
    categories && categories[0],
    averageRating ? `${averageRating}/5` : undefined,
  ]
    .filter((data) => data !== undefined)
    .join(" • ");
};

export const isBookReadByUser = async (bookId, user) => {
  if (user) {
    const doc = await db
      .collection("books")
      .where("bookId", "==", bookId)
      .where("userId", "==", user.uid)
      .limit(1)
      .get();
    if (!doc.empty) {
      return true;
    }
    return false;
  }
};

export const estReadingTime = (pages) => {
  const typicalPageLength = 300;
  const wordPerMinute = 300;

  const time = Math.ceil((pages * typicalPageLength) / wordPerMinute);
  const hours = Math.ceil(time / 60);
  const minutes = time % 60;

  return `Est. Reading Time ${hours ? hours + " hours" : ""} ${
    minutes ? minutes + " minutes" : ""
  }  `;
};

export const bookFilter = (books, searchQuery) => {
  return books.filter((book) =>
    book.fullTitle.toLowerCase().includes(searchQuery)
  );
};
