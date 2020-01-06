import ISession from "../../types/ISession";
import { SET_SESSION, SessionActionTypes } from "../../types/SessionActionTypes";

export const setSession = (session: ISession): SessionActionTypes => ({
  type: SET_SESSION,
  payload: session,
});
