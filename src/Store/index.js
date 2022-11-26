import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user";
import snackbarReducer from "./Reducers/snackbar";
import progressReducer from "./Reducers/progress";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    progress : progressReducer
  },
});
