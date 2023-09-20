import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./reducers/example-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const appReducer = combineReducers({
  exampleReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: appReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof appReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
