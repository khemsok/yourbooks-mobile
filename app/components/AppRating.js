import React from "react";

// RNE
import { AirbnbRating } from "react-native-elements";

// utils
import { updateRating } from "../api/firebaseApi";

export default function AppRating({ docId, rating, setData = null }) {
  return (
    <AirbnbRating
      size={20}
      defaultRating={rating}
      showRating={false}
      count={5}
      onFinishRating={(newRating) => {
        if (setData) setData(newRating);
        updateRating(newRating, docId);
      }}
    />
  );
}
