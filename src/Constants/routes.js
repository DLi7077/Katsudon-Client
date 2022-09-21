import LandingPage from "../Views/LandingPage";
import Profile from "../Views/ProfilePage";
import Users from "../Views/Users";
import LeetcodeProblems from "../Views/LeetcodeProblems";
import Register from "../Views/Register";
import GetStarted from "../Views/Get Started";
import { PAGETHEME } from "./colors";

export const routes = [
  { path: "/welcome", element: <LandingPage /> },
  { path: "/get-started", element: <GetStarted /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/users", element: <Users /> },
  { path: "/problems", element: <LeetcodeProblems /> },
];

export const routeColors = {
  "/welcome": PAGETHEME.Blue,
  "/get-started": PAGETHEME.Blue,
  "/register": PAGETHEME.Blue,
  "/profile": PAGETHEME.Purple,
  "/users": PAGETHEME.LightBlue,
  "/problems": PAGETHEME.Orange,
};
