import { call, put, takeLatest } from "redux-saga/effects";
import { apiSignIn, apiSignOut } from "../../api/api";
import localforage from "localforage";
import {
  EMPTY_SESSION,
  GET_SESSION_FROM_LOCAL_STORAGE,
  SET_AUTH_ERROR,
  SET_SESSION,
  SIGN_IN,
  SIGN_OUT,
  SignInAction,
  SignOutAction,
} from "../../types/SessionActionTypes";

function* signIn(action: SignInAction) {
  try {
    const response = yield call(
      apiSignIn,
      action.payload.login,
      action.payload.password
    );
    if (response.errors && response.errors.length) {
      yield put({
        type: SET_AUTH_ERROR,
        payload: { error: response.errors[0].message },
      });
    } else {
      yield call([localforage, "setItem"], "vinkSession", response.data.signin);
      yield put({ type: SET_SESSION, payload: response.data.signin });
    }
  } catch (e) {
    console.log("Could not sign in: ", e);
  }
}

function* signOut(action: SignOutAction) {
  try {
    const response = yield call(apiSignOut, action.payload.token);
    if (response.errors && response.errors.length) {
      console.log("Could not sign out", response.errors[0].message);
    } else {
      yield call([localforage, "removeItem"], "vinkSession");
      yield put({ type: EMPTY_SESSION });
    }
  } catch (e) {
    console.log("Could not sign out: ", e);
  }
}

function* getSessionFromLocalStorage() {
  try {
    const session = yield call([localforage, "getItem"], "vinkSession");
    if (session) {
      yield put({ type: SET_SESSION, payload: session });
    }
  } catch (e) {
    console.log("Could not load session from local storage: ", e);
  }
}

function* sessionSaga() {
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
  yield takeLatest(GET_SESSION_FROM_LOCAL_STORAGE, getSessionFromLocalStorage);
}

export default sessionSaga;
