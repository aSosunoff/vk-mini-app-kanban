import { combineReducers } from "redux";
import desksReducer from "../../features/desks/reducer";
import columnsReducer from "../../features/columns/reducer";
import cardsReducer from "../../features/cards/reducer";

const rootReducer = combineReducers({
  desks: desksReducer,
  columns: columnsReducer,
  cards: cardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
