import ISession from "./ISession";

export const SET_SESSION = "SET_SESSION";

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: ISession;
}

export type SessionActionTypes = SetSessionAction;
