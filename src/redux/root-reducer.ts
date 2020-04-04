import { combineReducers } from "redux";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";

import sessionReducer from "./session/session.reducer";
import ISessionState from "../types/ISessionState";

export const rootReducer = (history: History) =>
  combineReducers({
    session: sessionReducer,
    router: connectRouter(history),
  });

export type RootState = {
  session: ISessionState;
  router: RouterState;
};
