import React from "react";
import ReactDOM from "react-dom";
/* import bridge from "@vkontakte/vk-bridge"; */
import { App } from "./components/App";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { AlertProvider } from "./context/alert-context";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { SnackbarProvider } from "./context/snackbar-context";

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
/* bridge.send("VKWebAppInit"); */

ReactDOM.render(
  <AdaptivityProvider>
    <AppRoot>
      <AlertProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </AlertProvider>
    </AppRoot>
  </AdaptivityProvider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {
    console.log(eruda);
  }); //runtime download
}
