import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScrollYPosition } from "react-use-scroll-position";
import { useEffect, useState } from "react";
import { get, map, omit } from "lodash";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import katsudonLogo from "../../Assets/katsudon.svg";
import { routeColors } from "../../Constants/routes";
import { MENU_LINKS } from "../../Constants/navbar";
import currentUser, { handleLogout } from "../../Utils/UserTools";
import "./styles.css";

export default function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
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
  };

  useEffect(() => {
    const { pathname } = location;
    setLogoColor(get(routeColors, `${pathname}.color`));
    props.changeTheme(get(routeColors, pathname));
  }, [location, props]);

  useEffect(() => {
    const navbar = document.querySelector(".navbar-container");
    const katsudonLogo = document.querySelector(".katsudon-logo");

    if (scrollY > 50) {
      navbar.classList.add("navbar-container-condensed");
      navbar.style.backgroundColor = `${get(
        routeColors,
        `${location.pathname}.navbar`
      )}dd`;
      katsudonLogo.classList.add("katsudon-logo-condensed");
      return;
    } else {
      navbar.classList.remove("navbar-container-condensed");
      katsudonLogo.classList.remove("katsudon-logo-condensed");
      navbar.style.backgroundColor = "black";
    }
    // eslint-disable-next-line
  }, [scrollY]);

  // display sections depending on if the user is logged in
  const userSection = () => {
    const loggedOutContent = (
      <>
        <Link
          to="/register"
          className="navbar-redirect-link"
          style={{ textDecoration: "none" }}
        >
          Register
        </Link>

        <Link
          to="/login"
          className="navbar-redirect-link"
          style={{ textDecoration: "none" }}
        >
          Login
        </Link>
      </>
    );

    const loggedInContent = (
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          to={`/profile?user_id=${currentUser("user-id")}`}
          className="navbar-redirect-link"
          style={{ textDecoration: "none", gap: "1rem" }}
        >
          <Avatar src={currentUser("profile_picture")} />
          {currentUser("username")}
        </Link>
        <IconButton
          style={{ color: "white" }}
          onClick={() => {
            handleLogout();
            navigate("/welcome");
          }}
        >
          <LogoutIcon style={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
      </div>
    );

    return currentUser("logged_in") ? loggedInContent : loggedOutContent;
  };

  const visibleRedirects = omit(
    MENU_LINKS,
    currentUser("logged_in")
      ? ["Welcome", "Register", "Login"]
      : ["Progress", "Profile"]
  );

  return (
    <>
      <div className="navbar-container">
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
          <div className="navbar-link-wrapper">
            <img
              src={katsudonLogo}
              className="katsudon-logo"
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
                      style={{ textDecoration: "none" }}
                    >
                      {label}
                    </Link>
                  </div>
                );
              }
            )}
          </div>
          <div className="navbar-redirect-link">{userSection()}</div>
        </div>
      </div>
      <div className="navbar-bottom-padding" />
    </>
  );
}
