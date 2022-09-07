import { get, map, omit } from "lodash";
import { Link, useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useScrollYPosition } from "react-use-scroll-position";
import { useEffect, useState } from "react";
import { routeColors } from "../../Constants/routes";
import { MENU_LINKS } from "../../Constants/navbar";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles.css";

export default function Navbar(props) {
  const location = useLocation();
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

    if (scrollY > 20) {
      navbar.classList.add("navbar-container-condensed");
      navbar.style.backgroundColor = get(
        routeColors,
        `${location.pathname}.navbar`
      );
      katsudonLogo.classList.add("katsudon-logo-condensed");
      return;
    } else {
      navbar.classList.remove("navbar-container-condensed");
      katsudonLogo.classList.remove("katsudon-logo-condensed");
      navbar.style.backgroundColor = "";
    }
    // eslint-disable-next-line
  }, [scrollY]);

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
            {map(MENU_LINKS, (path, label) => {
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
            <div className="katsudon-logo" style={{ color: logoColor }}>
              カツドン
            </div>
            {map(omit(MENU_LINKS, "Sign In"), (path, label) => {
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
            })}
          </div>

          <Link
            to="/profile"
            className="navbar-redirect-link"
            style={{ textDecoration: "none" }}
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="navbar-bottom-padding" />
    </>
  );
}
