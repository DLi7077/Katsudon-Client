import Api from "./Api";
import qs from "qs";

async function getAllUsers() {
  return Api({
    method: "get",
    endpoint: "api/user/all",
    params: {},
    headers: {},
  });
}

async function getUserSolutions(queryParams) {
  return Api({
    method: "get",
    endpoint: `api/solution/all?${qs.stringify(queryParams)}`,
    params: {},
    headers: {},
  });
}

async function getUserProfile(queryParams) {
  return Api({
    method: "get",
    endpoint: `api/user/profile?${qs.stringify(queryParams)}`,
    params: {},
    headers: {},
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

async function followUser(user_id, token) {
  return Api({
    method: "post",
    endpoint: "api/user/follow",
    body: { follow: user_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function unfollowUser(user_id, token) {
  return Api({
    method: "post",
    endpoint: "api/user/unfollow",
    body: { unfollow: user_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const UserAPI = {
  getAllUsers,
  getUserSolutions,
  getUserProfile,
  createAccount,
  login,
  followUser,
  unfollowUser,
};

export default UserAPI;
