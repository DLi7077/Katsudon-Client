import Api from "./Api";

async function getUserSolutions(userId) {
  return Api({
    method: "get",
    endpoint: `api/solution/${userId}`,
    params: {},
    headers: {},
  });
}

async function getUserProfile(username) {
  return Api({
    method: "get",
    endpoint: `api/user/${username}`,
    params: {},
    headers: {},
  });
}

const UserAPI = {
  getUserSolutions,
  getUserProfile,
};

export default UserAPI;
