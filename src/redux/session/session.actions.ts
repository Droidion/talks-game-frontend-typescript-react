import ISession from "../../types/ISession";
import {
  EMPTY_AUTH_ERROR,
  EMPTY_SESSION,
  GET_SESSION_FROM_LOCAL_STORAGE,
  SessionActionTypes,
  SET_AUTH_ERROR,
  SET_SESSION,
  SIGN_IN,
  SIGN_OUT,
} from "../../types/SessionActionTypes";

export const emptyAuthError = (): SessionActionTypes => ({
  type: EMPTY_AUTH_ERROR,
});

export const setAuthError = (error: string): SessionActionTypes => ({
  type: SET_AUTH_ERROR,
  payload: {
    error,
  },
});

export const emptySession = (): SessionActionTypes => ({
  type: EMPTY_SESSION,
});

export const setSession = (session: ISession): SessionActionTypes => ({
  type: SET_SESSION,
  payload: session,
});

export const signIn = (login: string, password: string): SessionActionTypes => ({
  type: SIGN_IN,
  payload: {
    login,
    password,
  },
});

export const signOut = (token: string): SessionActionTypes => ({
  type: SIGN_OUT,
  payload: {
    token,
  },
});

export const getSessionFromLocalStorage = (): SessionActionTypes => ({
  type: GET_SESSION_FROM_LOCAL_STORAGE,
});
