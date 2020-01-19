import { call, put, takeLatest } from "redux-saga/effects";
import fetchGraphQL from "../../lib/fetchGraphQL";
import apiQueries from "../../lib/apiQueries";
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
    const { errors, data } = yield call(fetchGraphQL, apiQueries.SIGN_IN, {
      login: action.payload.login,
      password: action.payload.password,
    });
    if (errors?.length > 0) {
      yield put({
        type: SET_AUTH_ERROR,
        payload: { error: errors[0].message },
      });
    } else {
      // Store session locally in browser storage
      yield call([localforage, "setItem"], "vinkSession", data.signin);
      // Store session in Redux state
      yield put({ type: SET_SESSION, payload: data.signin });
    }
  } catch (error) {
    console.error("Critical sign in error: ", error);
  }
}

/** Async user sign out */
function* signOut(action: SignOutAction) {
  try {
    // Make a request to backend
    const { errors } = yield call(fetchGraphQL, apiQueries.SIGN_OUT, {
      token: action.payload.token,
    });
    if (errors?.length > 0) {
      console.error(errors[0].message);
    } else {
      // Clear session in local storage
      yield call([localforage, "removeItem"], "vinkSession");
      // Clear session in Redux state
      yield put({ type: EMPTY_SESSION });
    }
  } catch (e) {
    console.error("Could not sign out", e);
  }
}

function* sessionSaga() {
  yield takeLatest(GET_SESSION_FROM_LOCAL_STORAGE, getSessionFromLocalStorage);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
}

export default sessionSaga;
