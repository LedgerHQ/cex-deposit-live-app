import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./reducers/example-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const appReducer = combineReducers({
  exampleReducer,
});

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
