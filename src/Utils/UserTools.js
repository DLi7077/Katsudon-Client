import { get } from "lodash";

// add all keys and go to profile page
export function handleLogin(loginDetails) {
  const authToken = loginDetails.auth_token;
  const userId = loginDetails.user_id;
  const username = loginDetails.username;
  const profilePicture = loginDetails.profile_picture;
  const following = loginDetails.following;

  localStorage.setItem("katsudon-lc-logged-in", true);
  localStorage.setItem("katsudon-lc-auth-token", authToken);
  localStorage.setItem("katsudon-lc-username", username);
  localStorage.setItem("katsudon-lc-user-profile-picture", profilePicture);
  localStorage.setItem("katsudon-lc-following", JSON.stringify(following));
  localStorage.setItem("katsudon-lc-user-id", userId);
}

// remove all keys and refresh page
export function handleLogout() {
  const keyBase = "katsudon-lc";
  const userItems = [
    "logged-in",
    "auth-token",
    "user-id",
    "username",
    "following",
    "user-profile-picture",
  ];

  userItems.forEach((item) => {
    localStorage.removeItem(`${keyBase}-${item}`);
  });
  window.location.reload(false);
}

function currentUser(key) {
  const userDetails = {
    logged_in: JSON.parse(
      localStorage.getItem("katsudon-lc-logged-in") === "true"
    ),
    auth_token: localStorage.getItem("katsudon-lc-auth-token"),
    _id: localStorage.getItem("katsudon-lc-user-id"),
    username: localStorage.getItem("katsudon-lc-username"),
    profile_picture: localStorage.getItem("katsudon-lc-user-profile-picture"),
    following: JSON.parse(localStorage.getItem("katsudon-lc-following")),
  };

  return get(userDetails, key);
}


export default currentUser;
