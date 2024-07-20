import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from "./rootReducer";
import { apiSlice } from "./api/apiSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const combinedReducer = combineReducers({ ...rootReducer, [apiSlice.reducerPath]: apiSlice.reducer })

const persistedReducer = persistReducer(persistConfig, combinedReducer)

export const store = configureStore({
  reducer: { ...rootReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    const middleware = [...getDefaultMiddleware(), apiSlice.middleware];
    return middleware;
  },
});
export const persistor = persistStore(store)
