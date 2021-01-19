import React, { useState, useEffect, useRef } from "react";

// Context
import { useAuth } from "../auth/context";

// util
import { db } from "../auth/appConfig";

export default function useGetBooksCompleteStatus(completeStatus) {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mountRef = useRef(false);

  useEffect(() => {
    try {
      if (user) {
        const unsubscribe = db
          .collection("books")
          .where("userId", "==", user.uid)
          .where("completeStatus", "==", completeStatus)
          .onSnapshot((snapshot) => {
            setIsLoading(true);
            let books = snapshot.docs.map((doc) => ({
              docId: doc.id,
              docData: doc.data(),
              read: true,
            }));
            setData(books);
            setIsLoading(false);
            mountRef.current = true;
          });

        return unsubscribe;
      }
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    initialLoad: mountRef.current,
  };
}
