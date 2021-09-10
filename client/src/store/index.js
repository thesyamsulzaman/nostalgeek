import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import ui from "./reducers/ui";
import invitations from "./reducers/invitations";
import user from "./reducers/user";

import dotenv from "dotenv";
dotenv.config();

const reducers = combineReducers({
  ui,
  user,
  invitations,
});

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
