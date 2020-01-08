import ISessionState from "../../types/ISessionState";
import {
  EMPTY_SESSION,
  SET_SESSION,
  SessionActionTypes,
} from "../../types/SessionActionTypes";

const INITIAL_STATE: ISessionState = {
  session: {
    token: "foo",
    team_number: 1,
    team_type: "foo",
    is_commander: false,
    created_at: "foo",
    updated_at: "foo",
  },
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
