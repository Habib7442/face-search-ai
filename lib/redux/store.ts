import { configureStore } from "@reduxjs/toolkit";
import creditsReducer from "./features/credits/creditsSlice";

export const store = configureStore({
  reducer: {
    credits: creditsReducer,
  },
  // Add middleware or enhancers if needed
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the type of store
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {credits: CreditsState}
export type AppDispatch = typeof store.dispatch;
