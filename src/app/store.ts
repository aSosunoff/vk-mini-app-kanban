import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./redux/reducers";
import { logMiddleware } from "./redux/middleware/logMiddleware";
/* import { API } from "./redux/middleware/api"; */

const enhancer = applyMiddleware(thunk, /* API, */ logMiddleware);

export default createStore(reducer, composeWithDevTools(enhancer));
