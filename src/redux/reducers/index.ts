import { combineReducers } from "redux";
import desksReducer from "./desksReducer";

const rootReducer = combineReducers({
  desks: desksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
