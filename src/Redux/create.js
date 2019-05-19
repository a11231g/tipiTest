import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import { rootReducres, whitelist } from "./reducer";
import saga from "./saga";

const config = {
  key: "root",
  storage,
  whitelist,
  debug: true // to get useful logging
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);
if (__DEV__) {
  middleware.push(createLogger());
}

const persistedreducers = persistCombineReducers(config, rootReducres);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const store = createStore(persistedreducers, undefined, compose(...enhancers));

const persistor = persistStore(store, persistConfig, () => {
  console.log("Test", store.getState());
});

const configureStore = client => {
  sagaMiddleware.run(saga, client, store);
  return { persistor, store };
};

export default configureStore;
