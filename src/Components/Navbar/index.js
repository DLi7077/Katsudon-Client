import { get, map, omit } from "lodash";
import { Link, useLocation } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { routeColors } from "../../Constants/routes";
import { MENU_LINKS } from "../../Constants/navbar";
import "./styles.css";

export default function Navbar(props) {
  const location = useLocation();
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

  //navbar transition on scroll
  document.onreadystatechange = function () {
    let lastScrollPosition = 0;
    const navbar = document.querySelector(".navbar-container");
    const katsudonLogo = document.querySelector(".katsudon-logo");
    window.addEventListener("scroll", function (e) {
      lastScrollPosition = window.scrollY;

      if (lastScrollPosition >= 20) {
        navbar.classList.add("navbar-container-condensed");
        katsudonLogo.classList.add("katsudon-logo-condensed");
      } else {
        navbar.classList.remove("navbar-container-condensed");
        katsudonLogo.classList.remove("katsudon-logo-condensed");
      }
    });
  };

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
      <div className="navbar-bottom-padding"></div>
    </>
  );
}
