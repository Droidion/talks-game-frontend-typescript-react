import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import sessionSaga from "./session/session.saga";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), logger, sagaMiddleware];

const store = createStore(
  rootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sessionSaga);

export default store;
