import * as firebase from "firebase";
import "firebase/firestore";
import Constants from "expo-constants";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: Constants.manifest.extra.FIREBASE_APIKEY,
    authDomain: Constants.manifest.extra.FIREBASE_AUTHDOMAIN,
    projectId: Constants.manifest.extra.FIREBASE_PROJECTID,
    storageBucket: Constants.manifest.extra.FIREBASE_STORAGEBUCKET,
    messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGINGSENDERID,
    appId: Constants.manifest.extra.FIREBASE_APPID,
    measurementId: Constants.manifest.extra.FIREBASE_MEASUREMENTID,
  });
}

export const config = {
  iosClientId: Constants.manifest.extra.IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  androidClientId: Constants.manifest.extra.ANDROID_CLIENT_ID,
  iosStandaloneAppClientId: Constants.manifest.extra.IOS_CLIENT_ID,
  androidStandaloneAppClientId:
    Constants.manifest.extra.ANDROID_STANDALONE_CLIENT_ID,
};

export const auth = firebase.auth();
export const db = firebase.firestore();

export const awsApiKey = Constants.manifest.extra.AWS_API_KEY;
export const awsRecommenderUrl = Constants.manifest.extra.AWS_RECOMMENDER_URL;
