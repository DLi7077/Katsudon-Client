import currentUser from "../Utils/UserTools";

export const MENU_LINKS = {
  Welcome: "/welcome",
  Users: "/users",
  Problems: "/problems",
  Profile: `/profile?user_id=${currentUser("_id")}`,
  Register: "/register",
  Login: "/login",
};
