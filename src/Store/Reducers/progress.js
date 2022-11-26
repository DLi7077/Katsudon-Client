import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loaded: true,
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loaded = false;
      state.loading = true;
    },
    setLoaded: (state) => {
      state.loaded = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, setLoaded, stopLoading } = progressSlice.actions;

export default progressSlice.reducer;
