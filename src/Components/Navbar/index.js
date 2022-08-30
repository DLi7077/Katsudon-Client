import "./styles.css";
import { get } from "lodash";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { routeColors } from "../../Constants/routes";

export default function Navbar(props) {
  const location = useLocation();
  const [logoColor, setLogoColor] = useState(null);

  useEffect(() => {
    const { pathname } = location;
    setLogoColor(get(routeColors, `${pathname}.color`));
    props.changeTheme(get(routeColors, pathname));
  }, [location, props]);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-menu">
          <IconButton>
            <MenuIcon style={{ color: "white", fontSize: "4rem" }} />
          </IconButton>
        </div>
        <div className="navbar-redirect-section">
          <div className="navbar-link-wrapper">
            <div className="navbar-logo" style={{ color: logoColor }}>
              カツドン
            </div>
            <div className="redirect-links">
              <Link
                to="/welcome"
                className="navbar-redirect-link"
                style={{ textDecoration: "none" }}
              >
                Leaderboard
              </Link>
            </div>
            <div className="redirect-links">
              <Link
                to="/users"
                className="navbar-redirect-link"
                style={{ textDecoration: "none" }}
              >
                Users
              </Link>
            </div>

            <div className="redirect-links">
              <Link
                to="/problems"
                className="navbar-redirect-link"
                style={{ textDecoration: "none" }}
              >
                Leetcode Problems
              </Link>
            </div>
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
