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
          <GitHubIcon style={classes.icon} />
        </IconButton>
        <IconButton>
          <LinkedInIcon style={classes.icon} />
        </IconButton>
      </div>
      please hire me
    </div>
  );
}
