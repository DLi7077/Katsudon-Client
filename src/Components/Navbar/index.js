import "./styles.css";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
            <div className="navbar-redirect-link">Leaderboard</div>
            <div className="navbar-redirect-link">Users</div>
            <div className="navbar-redirect-link">Leetcode Problems</div>
          </div>
          <div className="navbar-redirect-link">Sign In</div>
        </div>
      </div>
      <div className="navbar-bottom-padding"></div>
    </>
  );
}
