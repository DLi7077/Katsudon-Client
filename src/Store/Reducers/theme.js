import { createSlice } from "@reduxjs/toolkit";
import { PAGETHEME } from "../../Constants/colors";

const initialState = {
  ...PAGETHEME.Monotone,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeOrange: () => {
      return { ...PAGETHEME.Orange };
    },
    setThemeBlue: () => {
      return { ...PAGETHEME.Blue };
    },
    setThemeGreen: () => {
      return { ...PAGETHEME.Green };
    },
    setThemeLightBlue: () => {
      return { ...PAGETHEME.LightBlue };
    },
    setThemePurple: () => {
      return { ...PAGETHEME.Purple };
    },
  },
});

export const {
  setThemeOrange,
  setThemeBlue,
  setThemeGreen,
  setThemeLightBlue,
  setThemePurple,
} = themeSlice.actions;

export default themeSlice.reducer;
