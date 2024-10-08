import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Assuming you will have multiple slices

const store = configureStore({
  reducer: rootReducer,
});

export default store;
