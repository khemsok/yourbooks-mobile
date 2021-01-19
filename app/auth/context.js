import React, { useState, useEffect, useContext, createContext } from "react";

// Auth
import { auth, config } from "./appConfig";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

// util
import storage from "./storage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // initSignIn();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      const data = await Google.logInAsync(config);
      if (data.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        // const firebaseUser = await firebase
        //   .auth()
        //   .signInWithCredential(credential);
        // setUser(firebaseUser);
        // setAccessToken(data.accessToken);

        return auth
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => auth.signInWithCredential(credential));

        // await storage.setCredentials(
        //   JSON.stringify({
        //     idToken: data.idToken,
        //     accessToken: data.accessToken,
        //   })
        // );
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    // await Google.logOutAsync({
    //   accessToken: accessToken,
    //   ...config,
    // });
    await auth.signOut();
    // storage.deleteCredentials();
  };

  const value = { user, isLoading, signIn, signOut };

  if (initializing) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
