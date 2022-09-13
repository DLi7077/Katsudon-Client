import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./styles.css";
import { IconButton } from "@mui/material";

const classes = {
  icon: {
    fontSize: "3rem",
    color: "white",
  },
};

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <IconButton>
          <a href="https://github.com/DLi7077">
            <GitHubIcon style={classes.icon} />
          </a>
        </IconButton>
        <IconButton>
          <a href="https://www.linkedin.com/in/devin-li7077/">
            <LinkedInIcon style={classes.icon} />
          </a>
        </IconButton>
      </div>
      please hire me
    </div>
  );
}
