import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  severity: "info",
  show: false,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarError: (state, action) => {
      state.show = true;
      state.message = action.payload;
      state.severity = "error";
    },
    setSnackbarInfo: (state, action) => {
      state.show = true;
      state.message = action.payload;
      state.severity = "info";
    },
    setSnackbarWarning: (state, action) => {
      state.show = true;
      state.message = action.payload;
      state.severity = "warning";
    },
    setSnackbarSuccess: (state, action) => {
      state.show = true;
      state.message = action.payload;
      state.severity = "success";
    },
    showSnackbar: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const {
  setSnackbarError,
  setSnackbarInfo,
  setSnackbarWarning,
  setSnackbarSuccess,
  showSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
