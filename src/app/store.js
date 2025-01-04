import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "../gridUtilities/gridSlice";

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});
