import React from "react";
import ReactDOM from "react-dom";
/* import bridge from "@vkontakte/vk-bridge"; */
import * as backend from "./models/firebase";
import * as router from "./router";
import { App } from "./components/app";
import { AlertProvider } from "./context/alert-context";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { SnackbarProvider } from "./context/snackbar-context";
import { AppStateProvider } from "./context/app-state-context";
import ErrorBoundary from "./HOC/ErrorBoundary";
import { RouterProvider } from "react-router5";

backend.initializeApp();

const route = router.initialize();

// Init VK  Mini App
/* bridge.send("VKWebAppInit"); */

ReactDOM.render(
  <AdaptivityProvider>
    <AppRoot>
      <AlertProvider>
        <SnackbarProvider>
          <AppStateProvider>
            <RouterProvider router={route}>
              <ErrorBoundary>{(hasError) => <App hasError={hasError} />}</ErrorBoundary>
            </RouterProvider>
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
