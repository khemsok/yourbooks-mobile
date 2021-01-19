import * as SecureStore from "expo-secure-store";

const key = "credentials";

export const setCredentials = async (credentials) => {
  try {
    await SecureStore.setItemAsync(key, credentials);
  } catch (error) {
    console.error("Error storing auth token");
  }
};

export const getCredentials = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error getting the auth token");
  }
};

export const deleteCredentials = async () => {
  try {
    SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(error);
  }
};

export default { setCredentials, getCredentials, deleteCredentials };
