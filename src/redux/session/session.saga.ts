import { call, put, takeLatest } from "redux-saga/effects";
import { apiAuth } from "../../api/api";
import {
  SET_SESSION,
  SIGN_IN,
  SessionActionTypes,
} from "../../types/SessionActionTypes";

function* auth(action: SessionActionTypes) {
  try {
    const response = yield call(apiAuth);
    yield put({ type: SET_SESSION, payload: response.data.signin });
  } catch (e) {
    console.log("Could not sign in: ", e);
  }
}

function* sessionSaga() {
  yield takeLatest(SIGN_IN, auth);
}

export default sessionSaga;
