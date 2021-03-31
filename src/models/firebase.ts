import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export const initializeApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDy_s8iisu5mEYvW0r9Ryk6IzkdlbWky2k",
    authDomain: "kanban-vk-mini.firebaseapp.com",
    databaseURL: "https://kanban-vk-mini-default-rtdb.firebaseio.com",
    projectId: "kanban-vk-mini",
    storageBucket: "kanban-vk-mini.appspot.com",
    messagingSenderId: "248866479246",
    appId: "1:248866479246:web:866981d140783fc2f1fddf",
    measurementId: "G-4XBV89MV44",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};
