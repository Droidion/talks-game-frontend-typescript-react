import ISessionState from "../../types/ISessionState";
import {
  EMPTY_SESSION,
  SET_SESSION,
  SessionActionTypes,
} from "../../types/SessionActionTypes";

const INITIAL_STATE: ISessionState = {
  session: null,
};

const sessionReducer = (
  state = INITIAL_STATE,
  action: SessionActionTypes
): ISessionState => {
  switch (action.type) {
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
