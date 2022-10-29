import { Link, useLocation, useNavigate } from "react-router-dom";
import { useScrollYPosition } from "react-use-scroll-position";
import { useEffect, useState } from "react";
import { get, map, omit, pick } from "lodash";
import {
  Avatar,
  createTheme,
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
    underline: {
      width: "100%",
      height: "3px",
      marginTop: "5px",
      backgroundColor: logoColor,
      borderRadius: "10px",
      position: "absolute",
    },
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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#000000",
      },
    },
    components: {
      // Name of the component
      MuiMenu: {
        paper: {
          backgroundColor: "#000000",
        },
      },
    },
  });

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
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
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
          <div className="navbar-redirect-link">{userSection()}</div>
        </div>
      </div>
      <div className="navbar-bottom-padding" />
    </>
  );
}
