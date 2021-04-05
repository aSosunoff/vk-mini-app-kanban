import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";

const routes = [
  { name: "desks", path: "/" },
  { name: "columns", path: "/desk" },
];

export const initialize = () => {
  const router = createRouter(routes);

  router.usePlugin(browserPlugin());

  router.start();

  return router;
};
