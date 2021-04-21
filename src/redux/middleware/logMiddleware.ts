import { Middleware } from "redux";

export const logMiddleware: Middleware = () => (next) => (action) => {
  console.log(action.type, action);
  return next(action);
};
