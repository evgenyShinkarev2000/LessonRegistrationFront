import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./RootSlice";
import { api } from "./api";


export const store = configureStore({
  reducer: {
    rootReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
