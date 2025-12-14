import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { apiCallMiddleware } from "./middleware/apicall.middleware";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
  // persist the userData and product slices so logged-in state survives reload
  whitelist: ["userData", "product"],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(loggerMiddleware)
      .concat(apiCallMiddleware),
});



export const persistor = persistStore(store);
