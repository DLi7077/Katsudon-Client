import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScrollYPosition } from "react-use-scroll-position";
import { useEffect, useState } from "react";
import { get, map, omit, pick } from "lodash";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import katsudonLogo from "../../Assets/katsudon.svg";
import { routeColors } from "../../Constants/routes";
import { MENU_LINKS } from "../../Constants/navbar";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../Store/Reducers/user";
import ProgressBar from "./ProgressBar";
import { MAIN_THEME } from "../../Constants/theme";
import "./styles.css";

export default function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);
  const progress = useSelector((state) => state.progress);

  const scrollY = useScrollYPosition();
  const [logoColor, setLogoColor] = useState(null);
  const [anchorElement, setAnchorElement] = useState(null);

  const classes = {
    MenuItem: {
      fontSize: "1.5rem",
      "&:hover": {
        color: logoColor ?? "white",
      },
    },
    link: { textDecoration: "none", color: "white" },
    underline: {
      width: "100%",
      height: "3px",
      marginTop: "5px",
      backgroundColor: logoColor,
      borderRadius: "10px",
      position: "absolute",
    },
  };

  function handleLogout() {
    dispatch(userLogout());
    navigate("/welcome");
  }

  useEffect(() => {
    const { pathname } = location;
    setLogoColor(get(routeColors, `${pathname}.color`));
    props.changeTheme(get(routeColors, pathname));
  }, [location, props]);

  // display sections depending on if the user is logged in
  function UserSection() {
    const signedOutLinks = pick(visibleRedirects, ["Register", "Login"]);
    const loggedOutContent = map(signedOutLinks, (path, label) => (
      <Link
        key={path}
        to={path}
        className="navbar-redirect-link"
        style={{ textDecoration: "none" }}
      >
        <div>
          {label}
          {path === location.pathname && <div style={classes.underline} />}
        </div>
      </Link>
    ));

    const loggedInContent = (
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          to={`/profile?user_id=${get(currentUser, "user_id")}`}
          className="navbar-redirect-link"
          style={{ textDecoration: "none", gap: "1rem" }}
        >
          <Avatar src={get(currentUser, "profile_picture_url")} />
          {get(currentUser, "username")}
        </Link>
        <IconButton style={{ color: "white" }} onClick={handleLogout}>
          <LogoutIcon style={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
      </div>
    );

    return (
      <div className="navbar-redirect-link">
        {!!currentUser.logged_in ? loggedInContent : loggedOutContent}
      </div>
    );
  }

  const visibleRedirects = omit(
    MENU_LINKS,
    currentUser.logged_in
      ? ["Welcome", "Register", "Login"]
      : ["Progress", "Profile"]
  );

  function DesktopMenu() {
    return (
      <div className="navbar-link-wrapper">
        <img
          src={katsudonLogo}
          className={`katsudon-logo ${scrollY > 50 ? "logo-condensed" : ""}`}
          alt="katsudon-logo"
        />
        {map(
          omit(visibleRedirects, ["Register", "Login", "Profile"]),
          (path, label) => {
            return (
              <div key={label} className="redirect-links">
                <Link
                  to={path}
                  className="navbar-redirect-link"
                  style={{ textDecoration: "none", position: "relative" }}
                >
                  <div>
                    {label}
                    {path === location.pathname && (
                      <div style={classes.underline}></div>
                    )}
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>
    );
  }

  return (
    <nav>
      <div
        className={`navbar-container ${scrollY > 50 ? "navbar-condensed" : ""}`}
        style={
          scrollY > 50
            ? {
                backgroundColor: `${get(
                  routeColors,
                  `${location.pathname}.navbar`
                )}`,
              }
            : {}  
        }
      >
        <div className="navbar-menu">
          <IconButton
            onClick={(e) => {
              setAnchorElement(e.currentTarget);
            }}
          >
            <MenuIcon style={{ color: "white", fontSize: "4rem" }} />
          </IconButton>
          <Menu
            style={{ marginLeft: "-1.5rem" }}
            anchorEl={anchorElement}
            open={!!anchorElement}
            onClose={() => setAnchorElement(null)}
          >
            {map(visibleRedirects, (path, label) => {
              return (
                <Link key={label} to={path} style={classes.link}>
                  <MenuItem sx={classes.MenuItem}>{label}</MenuItem>
                </Link>
              );
            })}
          </Menu>
        </div>
        <div className="navbar-redirect-section">
          <DesktopMenu />
          <UserSection />
        </div>
      </div>
      <ProgressBar
        loading={progress.loading}
        loaded={progress.loaded}
        color={logoColor}
      />
    </nav>
  );
}
