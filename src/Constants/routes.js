import LandingPage from "../Views/LandingPage";
import Profile from "../Views/ProfilePage";
import Users from "../Views/Users";
import LeetcodeProblems from "../Views/LeetcodeProblems";

export const routes = [
  { path: "/welcome", element: <LandingPage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/users", element: <Users /> },
  { path: "/problems", element: <LeetcodeProblems /> },
];
