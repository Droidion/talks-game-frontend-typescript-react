import { combineReducers } from "redux";

import sessionReducer from "./session/session.reducer";

export default combineReducers({
  session: sessionReducer,
});
