// lib/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import adultFilterReducer from './slices/adultFilterSlice';

export const rootReducer = combineReducers({
  // other reducers...
  adultFilter: adultFilterReducer
});