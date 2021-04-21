import { combineReducers } from "redux";
import deskReducer from "./deskReducer";

const rootReducer = combineReducers({
  desk: deskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
