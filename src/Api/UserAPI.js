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

const UserAPI = {
  getAllUsers,
  getUserSolutions,
  getUserProfile,
  createAccount,
};

export default UserAPI;
