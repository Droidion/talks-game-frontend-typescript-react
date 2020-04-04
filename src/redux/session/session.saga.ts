import localforage from "localforage";
import { call, put, takeLatest } from "redux-saga/effects";

import apiQueries from "../../lib/apiQueries";
import fetchGraphQL from "../../lib/fetchGraphQL";
import PhoenixSocket from "../../lib/PhoenixSocket";
import ISession from "../../types/ISession";
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
import { push } from "connected-react-router";
import TeamRole from "../../types/TeamRole";

/** Get session from local browser storage */
function* getSessionFromLocalStorage() {
  try {
    const session = yield call([localforage, "getItem"], "vinkSession");
    if (session) {
      // Put session to redux state
      yield put({ type: SET_SESSION, payload: session });
      // Open socket
      const socket = new PhoenixSocket();
      socket.connect().joinChannel();
    }
  } catch (e) {
    console.log("Could not load session from local storage: ", e);
  }
}

/** Async user sign in */
function* signIn(action: SignInAction) {
  try {
    // Make a request to backend
    const data: { signin: ISession } = yield call(fetchGraphQL, apiQueries.SIGN_IN, {
      login: action.payload.login,
      password: action.payload.password,
    });
    // Store session locally in browser storage
    yield call([localforage, "setItem"], "vinkSession", data.signin);
    // Store session in Redux state
    yield put({ type: SET_SESSION, payload: data.signin });
    // Open socket
    const socket = new PhoenixSocket();
    socket.connect().joinChannel();
    const path =
      data.signin.teamType === TeamRole.Admin ? "/admin/timer" : "/production";
    yield put(push(path));
  } catch (error) {
    yield put({
      type: SET_AUTH_ERROR,
      payload: { error },
    });
  }
}

/** Async user sign out */
function* signOut(action: SignOutAction) {
  try {
    // Make a request to backend
    yield call(fetchGraphQL, apiQueries.SIGN_OUT, {
      token: action.payload.token,
    });
  } catch (error) {
    console.error(error);
  } finally {
    // Clear session in local storage
    yield call([localforage, "removeItem"], "vinkSession");
    // Clear session in Redux state
    yield put({ type: EMPTY_SESSION });
    yield put(push("/auth/signin"));
  }
}

function* sessionSaga() {
  yield takeLatest(GET_SESSION_FROM_LOCAL_STORAGE, getSessionFromLocalStorage);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
}

export default sessionSaga;
