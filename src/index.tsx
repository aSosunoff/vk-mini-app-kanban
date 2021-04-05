import React from "react";
import ReactDOM from "react-dom";
/* import bridge from "@vkontakte/vk-bridge"; */
import * as backend from "./models/firebase";
import { App } from "./components/app";
import { AlertProvider } from "./context/alert-context";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { SnackbarProvider } from "./context/snackbar-context";
import { AppStateProvider } from "./context/app-state-context";
import ErrorBoundary from "./HOC/ErrorBoundary";

backend.initializeApp();

// Init VK  Mini App
/* bridge.send("VKWebAppInit"); */

ReactDOM.render(
  <AdaptivityProvider>
    <AppRoot>
      <AlertProvider>
        <SnackbarProvider>
          <AppStateProvider>
            <ErrorBoundary>{(hasError) => <App hasError={hasError} />}</ErrorBoundary>
          </AppStateProvider>
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
