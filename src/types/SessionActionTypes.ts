import ISession from "./ISession";

export const SET_SESSION = "SET_SESSION";
export const EMPTY_SESSION = "EMPTY_SESSION";

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: ISession;
}

interface EmptySessionAction {
  type: typeof EMPTY_SESSION;
}

export type SessionActionTypes = SetSessionAction | EmptySessionAction;
