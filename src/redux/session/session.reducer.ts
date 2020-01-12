import ISessionState from "../../types/ISessionState";
import {
  EMPTY_AUTH_ERROR,
  EMPTY_SESSION,
  SessionActionTypes,
  SET_AUTH_ERROR,
  SET_SESSION,
} from "../../types/SessionActionTypes";

const INITIAL_STATE: ISessionState = {
  authError: null,
  session: null,
};

const sessionReducer = (
  state = INITIAL_STATE,
  action: SessionActionTypes
): ISessionState => {
  switch (action.type) {
    case EMPTY_AUTH_ERROR:
      return {
        ...state,
        authError: null,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload.error,
      };
    case EMPTY_SESSION:
      return {
        ...state,
        session: null,
      };
    case SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
