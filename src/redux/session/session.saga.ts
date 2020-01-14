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

/** Get session from local browser storage */
function* getSessionFromLocalStorage() {
  try {
    const session = yield call([localforage, "getItem"], "vinkSession");
    if (session) {
      // Put session to redux state
      yield put({ type: SET_SESSION, payload: session });
    }
  } catch (e) {
    console.log("Could not load session from local storage: ", e);
  }
}

/** Async user sign in */
function* signIn(action: SignInAction) {
  try {
    // Make a request to backend
    const response = yield call(
      apiSignIn,
      action.payload.login,
      action.payload.password
    );
    if (response.errors && response.errors.length) {
      // Update state with response error
      yield put({
        type: SET_AUTH_ERROR,
        payload: { error: response.errors[0].message },
      });
    } else {
      // Store session locally in browser storage
      yield call([localforage, "setItem"], "vinkSession", response.data.signin);
      // Store session in Redux state
      yield put({ type: SET_SESSION, payload: response.data.signin });
    }
  } catch (e) {
    console.log("Could not sign in: ", e);
  }
}

/** Async user sign out */
function* signOut(action: SignOutAction) {
  try {
    // Make a request to backend
    const response = yield call(apiSignOut, action.payload.token);
    if (response.errors && response.errors.length) {
      console.log("Could not sign out", response.errors[0].message);
    } else {
      // Clear session in local storage
      yield call([localforage, "removeItem"], "vinkSession");
      // Clear session in Redux state
      yield put({ type: EMPTY_SESSION });
    }
  } catch (e) {
    console.log("Could not sign out: ", e);
  }
}

function* sessionSaga() {
  yield takeLatest(GET_SESSION_FROM_LOCAL_STORAGE, getSessionFromLocalStorage);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
}

export default sessionSaga;
