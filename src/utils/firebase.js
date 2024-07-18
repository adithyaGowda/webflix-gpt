// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA256qCTbyC-FbUy0SYyWashLotIMr4-bg",
  authDomain: "webflix-gpt-962a8.firebaseapp.com",
  projectId: "webflix-gpt-962a8",
  storageBucket: "webflix-gpt-962a8.appspot.com",
  messagingSenderId: "537749330310",
  appId: "1:537749330310:web:38ab8ca6fd281fb89af407",
  measurementId: "G-LY9VE6G0G0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
