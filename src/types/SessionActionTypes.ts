import ISession from "./ISession";

export const EMPTY_AUTH_ERROR = "EMPTY_AUTH_ERROR";
export const EMPTY_SESSION = "EMPTY_SESSION";
export const GET_SESSION_FROM_LOCAL_STORAGE = "GET_SESSION_FROM_LOCAL_STORAGE";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const SET_SESSION = "SET_SESSION";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

interface SetAuthErrorAction {
  type: typeof SET_AUTH_ERROR;
  payload: {
    error: string;
  };
}

interface EmptyAuthErrorAction {
  type: typeof EMPTY_AUTH_ERROR;
}

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: ISession;
}

interface EmptySessionAction {
  type: typeof EMPTY_SESSION;
}

interface GetSessionFromLocalStorageAction {
  type: typeof GET_SESSION_FROM_LOCAL_STORAGE;
}

export interface SignInAction {
  type: typeof SIGN_IN;
  payload: {
    login: string;
    password: string;
  };
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
  payload: {
    token: string;
  };
}

export type SessionActionTypes =
  | EmptyAuthErrorAction
  | EmptySessionAction
  | GetSessionFromLocalStorageAction
  | SetAuthErrorAction
  | SetSessionAction
  | SignInAction
  | SignOutAction;
