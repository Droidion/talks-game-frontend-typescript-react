import { combineReducers } from "redux";

import sessionReducer from "./session/session.reducer";

export const rootReducer = combineReducers({
  session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
