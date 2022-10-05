import currentUser from "../Utils/UserTools";

export const MENU_LINKS = {
  Welcome: "/welcome",
  Users: "/users",
  Progress: "/weekly-progress",
  Profile: `/profile?user_id=${currentUser("user-id")}`,
  Register: "/register",
  Login: "/login",
};
