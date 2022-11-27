import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user";
import snackbarReducer from "./Reducers/snackbar";
import progressReducer from "./Reducers/progress";
import themeReducer from "./Reducers/theme";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    progress: progressReducer,
    theme: themeReducer,
  },
});
