import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

const initialState = {
  logged_in: false,
  user_id: null,
  username: null,
  profile_picture_url: null,
  followers: [],
  following: [],
  auth_token: localStorage.getItem("katsudon-lc-auth-token") ?? null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.logged_in = true;
      state.user_id = get(action.payload, "user_id");
      state.username = get(action.payload, "username");
      state.profile_picture_url = get(action.payload, "profile_picture_url");
      state.followers = get(action.payload, "followers");
      state.following = get(action.payload, "following");
      state.auth_token = get(action.payload, "auth_token");
    },
    userLogout: (state) => {
      localStorage.removeItem("katsudon-lc-auth-token");
      state = { ...initialState };
    },
    updateFollowing: (state, action) => {
      console.log(action.payload);
      state.following = get(action.payload,'following');
    },
    updateProfilePicture: (state, action) => {
      state.profile_picture_url = get(action.payload, "profile_picture_url");
    },
  },
});

export const { userLogin, updateUser, updateProfilePicture, updateFollowing } =
  userSlice.actions;

export default userSlice.reducer;
