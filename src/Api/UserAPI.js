import Api from "./Api";
import qs from 'qs'

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

const UserAPI = {
  getAllUsers,
  getUserSolutions,
  getUserProfile,
};

export default UserAPI;
