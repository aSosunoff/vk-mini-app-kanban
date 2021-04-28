import React from "react";
import ReactDOM from "react-dom";
/* import bridge from "@vkontakte/vk-bridge"; */
import * as backend from "./models/firebase";
import * as router from "./router";
import { App } from "./app";
import { AlertProvider } from "./context/alert-context";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { SnackbarProvider } from "./context/snackbar-context";
/* import { AppStateProvider } from "./context/app-state-context"; */
import ErrorBoundary from "./HOC/ErrorBoundary";
import { RouterProvider } from "react-router5";

import { Provider } from "react-redux";
import store from "./app/store";

backend.initializeApp();

const route = router.initialize();

// Init VK  Mini App
/* bridge.send("VKWebAppInit"); */

ReactDOM.render(
  <Provider store={store}>
    <AdaptivityProvider>
      <AppRoot>
        <AlertProvider>
          <SnackbarProvider>
            <RouterProvider router={route}>
              {/* <AppStateProvider> */}
              <ErrorBoundary>{(hasError) => <App hasError={hasError} />}</ErrorBoundary>
              {/* </AppStateProvider> */}
            </RouterProvider>
          </SnackbarProvider>
        </AlertProvider>
      </AppRoot>
    </AdaptivityProvider>
  </Provider>,
  document.getElementById("root")
);

// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {
//     console.log(eruda);
//   }); //runtime download
// }
