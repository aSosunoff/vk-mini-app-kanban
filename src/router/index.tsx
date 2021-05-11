import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import { panel } from "../hooks/useActivePanel";

const routes = [
  { name: panel.DESKS, path: "/" },
  { name: panel.COLUMNS, path: "/desk/:deskId" },
  { name: panel.CARD, path: "/desk/:deskId/column/:columnId/card/:cardId" },
];

export const initialize = () => {
  const router = createRouter(routes, { defaultRoute: panel.DESKS });

  router.usePlugin(browserPlugin());

  router.start();

  return router;
};
