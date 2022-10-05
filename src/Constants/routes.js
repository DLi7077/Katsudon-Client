import LandingPage from "../Views/LandingPage";
import Profile from "../Views/ProfilePage";
import Users from "../Views/Users";
import Progress from "../Views/Progress";
import Register from "../Views/Register";
import GetStarted from "../Views/Get Started";
import { PAGETHEME } from "./colors";
import Login from "../Views/Login";

export const routes = [
  { path: "/welcome", element: <LandingPage /> },
  { path: "/get-started", element: <GetStarted /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/profile", element: <Profile /> },
  { path: "/users", element: <Users /> },
  { path: "/weekly-progress", element: <Progress /> },
];

export const routeColors = {
  "/welcome": PAGETHEME.Blue,
  "/get-started": PAGETHEME.Blue,
  "/register": PAGETHEME.Blue,
  "/login": PAGETHEME.Blue,
  "/profile": PAGETHEME.Purple,
  "/users": PAGETHEME.LightBlue,
  "/weekly-progress": PAGETHEME.Orange,
};
