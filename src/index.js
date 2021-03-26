import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

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

// Init VK  Mini App
bridge.send("VKWebAppInit");

/*  */
const db = firebase.firestore();

db.collection("desks")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id}`);
      console.log(doc.data());
    });
  });
/*  */

ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
