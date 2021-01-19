import { useState } from "react";
import { Alert } from "react-native";

export default useApi = (apiFunc, timeout = 0) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const request = async (...args) => {
    setIsLoading(true);
    const response = await apiFunc(...args);
    if (response.ok) {
      setData(response.data);
      setTimeout(() => {
        setIsLoading(false);
        setError("");
      }, timeout);
    } else {
      setIsLoading(false);
      setError(response.error);
      Alert.alert(
        "Sorry, something went wrong. Please try again",
        response.error.message,
        [
          {
            text: "Try Again",
            onPress: () => {
              request(...args);
            },
          },
          {
            text: "Cancel",
          },
        ]
      );
    }
  };

  return { data, error, isLoading, request, setData };
};
