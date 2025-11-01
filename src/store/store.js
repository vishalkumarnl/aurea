import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import rootReducer from "./rootReducer";
import {loggerMiddleware} from "./middleware/logger.middleware";
import logger from 'redux-logger';
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
  whitelist:["auth", "product"]
}

const persistedRootReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
  reducer: persistedRootReducer,
  // middleware: applyMiddleware(...middleware)
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({serializableCheck:false}).concat(loggerMiddleware)
});

export const persistor = persistStore(store);
