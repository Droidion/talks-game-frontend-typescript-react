import ISession from "../../types/ISession";
import {
  EMPTY_SESSION,
  SET_SESSION,
  SessionActionTypes,
} from "../../types/SessionActionTypes";

export const emptySession = (): SessionActionTypes => ({
  type: EMPTY_SESSION,
});

export const setSession = (session: ISession): SessionActionTypes => ({
  type: SET_SESSION,
  payload: session,
});
