import { configureStore } from "@reduxjs/toolkit";
import holdingsReducer from "./holdingsSlice";
import capitalGainsReducer from "./capitalGainsSlice";

export const store = configureStore({
  reducer: {
    holdings: holdingsReducer,
    capitalGains: capitalGainsReducer,
  },
});
