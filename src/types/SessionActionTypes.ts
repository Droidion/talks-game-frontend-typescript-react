import ISession from "./ISession";

export const SET_SESSION = "SET_SESSION";
export const EMPTY_SESSION = "EMPTY_SESSION";
export const SIGN_IN = "SIGN_IN";

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: ISession;
}

interface EmptySessionAction {
  type: typeof EMPTY_SESSION;
}

interface SignInAction {
  type: typeof SIGN_IN;
  payload: {
    login: string;
    password: string;
  };
}

export type SessionActionTypes =
  | SetSessionAction
  | EmptySessionAction
  | SignInAction;
