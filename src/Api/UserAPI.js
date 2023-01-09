import Api from "./Api";
import qs from "qs";

async function getAllUsers() {
  return Api({
    method: "get",
    endpoint: "api/user/all",
    params: {},
  });
}

async function getUserSolutions(queryParams) {
  return Api({
    method: "get",
    endpoint: `api/solution/all?${qs.stringify(queryParams)}`,
    params: {},
  });
}

async function getWeeklySolutions(userId) {
  return Api({
    method: "get",
    endpoint: `api/solution/weekly-progress`,
    params: { user_id: userId },
  });
}

async function getUserProfile(queryParams) {
  return Api({
    method: "get",
    endpoint: `api/user/profile?${qs.stringify(queryParams)}`,
    params: {},
  });
}

async function createAccount(body) {
  return Api({
    method: "post",
    endpoint: `api/user/create`,
    body: body,
  });
}

async function login(body) {
  return Api({
    method: "post",
    endpoint: "api/user/login",
    body: body,
  });
}

async function restoreSession() {
  return Api({
    method: "get",
    endpoint: "api/user/jwt-retrieve",
  });
}

async function followUser(user_id) {
  return Api({
    method: "post",
    endpoint: "api/user/follow",
    body: { follow: user_id },
  });
}

async function unfollowUser(user_id, token) {
  return Api({
    method: "post",
    endpoint: "api/user/unfollow",
    body: { unfollow: user_id },
  });
}

async function updateBiography(biography, token) {
  return Api({
    method: "post",
    endpoint: "api/user/edit-bio",
    body: { biography: biography },
  });
}

async function uploadProfileBanner(formData, token) {
  return Api({
    method: "post",
    endpoint: "api/user/upload-banner",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function uploadProfilePicture(formData, token) {
  return Api({
    method: "post",
    endpoint: "api/user/upload-pfp",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const UserAPI = {
  getAllUsers,
  getUserSolutions,
  getWeeklySolutions,
  getUserProfile,
  createAccount,
  restoreSession,
  login,
  followUser,
  unfollowUser,
  updateBiography,
  uploadProfileBanner,
  uploadProfilePicture,
};

export default UserAPI;
