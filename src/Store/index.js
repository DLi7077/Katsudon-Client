import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user";
import snackbarReducer from "./Reducers/snackbar";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
  },
});
