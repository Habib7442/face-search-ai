// lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import creditsReducer from "./features/credits/creditsSlice";
import adultFilterReducer from './slices/adultFilterSlice';

export const store = configureStore({
  reducer: {
    credits: creditsReducer,
    adultFilter: adultFilterReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the type of store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;