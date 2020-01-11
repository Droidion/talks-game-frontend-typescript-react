import { call, put, takeLatest } from "redux-saga/effects";
import { apiAuth } from "../../api/api";
import {
  SET_AUTH_ERROR,
  SET_SESSION,
  SIGN_IN,
  SignInAction,
} from "../../types/SessionActionTypes";

function* auth(action: SignInAction) {
  try {
    const response = yield call(
      apiAuth,
      action.payload.login,
      action.payload.password
    );
    if (response.errors && response.errors.length) {
      yield put({
        type: SET_AUTH_ERROR,
        payload: { error: response.errors[0].message },
      });
    } else {
      yield put({ type: SET_SESSION, payload: response.data.signin });
    }
  } catch (e) {
    console.log("Could not sign in: ", e);
  }
}

function* sessionSaga() {
  yield takeLatest(SIGN_IN, auth);
}

export default sessionSaga;
