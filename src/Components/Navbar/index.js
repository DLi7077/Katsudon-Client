import "./styles.css";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PAGETHEME } from "../../Constants/colors";

export default function Navbar(props) {
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
            <div className="navbar-logo" style={props.style}>
              カツドン
            </div>
            <div className="redirect-links">
              <Link
                to="/welcome"
                className="navbar-redirect-link"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  props.changeTheme(PAGETHEME.Blue);
                }}
              >
                Leaderboard
              </Link>
            </div>
            <div className="redirect-links">
              <Link
                to="/users"
                className="navbar-redirect-link"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  props.changeTheme(PAGETHEME.LightBlue);
                }}
              >
                Users
              </Link>
            </div>

            <div className="redirect-links">
              <Link
                to="/welcome"
                className="navbar-redirect-link"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  props.changeTheme(PAGETHEME.Orange);
                }}
              >
                Leetcode Problems
              </Link>
            </div>
          </div>

          <Link
            to="/profile"
            className="navbar-redirect-link"
            style={{ textDecoration: "none" }}
            onClick={() => {
              props.changeTheme(PAGETHEME.Purple);
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="navbar-bottom-padding"></div>
    </>
  );
}
