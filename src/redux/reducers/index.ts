import { combineReducers } from "redux";
import desksReducer from "../../features/desks/reducer";
import columnsReducer from "./columnsReducer";

const rootReducer = combineReducers({
  desks: desksReducer,
  columns: columnsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
