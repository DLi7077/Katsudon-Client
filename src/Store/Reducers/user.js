import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

const initialState = {
  logged_in: false,
  user_id: null,
  username: null,
  email: "",
  profile_picture_url: null,
  profile_banner_url: null,
  followers: [],
  following: [],
  solved: [],
  verified: false,
  auth_token: localStorage.getItem("katsudon-lc-auth-token") ?? null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.logged_in = true;
      state.user_id = get(action.payload, "_id");
      state.username = get(action.payload, "username");
      state.email = get(action.payload, "email");
      state.profile_picture_url = get(action.payload, "profile_picture_url");
      state.profile_banner_url = get(action.payload, "profile_banner_url");
      state.biography = get(action.payload, "biography");
      state.followers = get(action.payload, "followers");
      state.following = get(action.payload, "following");
      state.solved = get(action.payload, "solved");
      state.verified = get(action.payload, "verified");
      if (get(action.payload, "auth_token")) {
        state.auth_token = get(action.payload, "auth_token");
        localStorage.setItem(
          "katsudon-lc-auth-token",
          get(action.payload, "auth_token")
        );
      }
    },
    userLogout: () => {
      localStorage.removeItem("katsudon-lc-auth-token");
      return { ...initialState };
    },
    updateFollowing: (state, action) => {
      state.following = get(action.payload, "following");
    },
    updateProfilePicture: (state, action) => {
      state.profile_picture_url = get(action.payload, "profile_picture_url");
    },
    updateProfileBanner: (state, action) => {
      state.profile_banner_url = get(action.payload, "profile_banner_url");
    },
    updateProfileBiography: (state, action) => {
      state.biography = get(action.payload, "biography");
    },
  },
});

export const {
  userLogin,
  userLogout,
  updateFollowing,
  updateProfilePicture,
  updateProfileBanner,
  updateProfileBiography,
} = userSlice.actions;

export default userSlice.reducer;
