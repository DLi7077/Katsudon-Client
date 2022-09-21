import React from "react";
import { Link } from "react-router-dom";
import katsudonStore from "../../Assets/tutorial/katsudon-store.png";
import katsudonAllow from "../../Assets/tutorial/katsudon-allow.png";
import katsudonOpen from "../../Assets/tutorial/katsudon-open.png";
import katsudonLogin from "../../Assets/tutorial/katsudon-login.png";
import katsudonLoginSuccess from "../../Assets/tutorial/katsudon-login-success.png";

const classes = {
  listItem: {
    fontSize: "1.5rem",
    padding: "1rem",
  },
};
export default function GetStarted(props) {
  return (
    <div
      className="content-container"
      style={{ padding: "2rem", backgroundColor: props.backgroundColor }}
    >
      <div style={{ fontSize: "2.25rem" }}>Getting Started</div>
      <ol style={{}}>
        <li style={classes.listItem}>
          Create an Account{" "}
          <Link
            to="/register"
            target="_blank"
            rel="noreferrer"
            style={{ color: props.color }}
          >
            here
          </Link>
        </li>

        <li style={classes.listItem}>
          Download the{" "}
          <a
            href="https://chrome.google.com/webstore/detail/katsudon/ncpppllgdfhgndifbpgcpkfolbbjfnol"
            target="_blank"
            rel="noreferrer"
            style={{ color: props.color }}
          >
            Katsudon Chrome Extension
          </a>
          <div>
            <br />
            This extension is only available on Google Chrome at this time.
            <br />
            I'll be working on compatibility for different browsers soon!
          </div>
          <img
            src={katsudonStore}
            style={{ paddingTop: "1rem", maxWidth: "100%" }}
            alt="Add the katsudon extension to Chrome"
          />
          <img
            src={katsudonAllow}
            style={{ paddingTop: "1rem", maxWidth: "100%" }}
            alt="allow katsudon to access leetcode.com"
          />
        </li>
        <li style={classes.listItem}>
          Open the extension in the extensions bar (top right of Chrome Browser)
          <br />
          <img
            src={katsudonOpen}
            style={{ paddingTop: "1rem", maxWidth: "100%" }}
            alt="Open extensions in extension bar"
          />
        </li>
        <li style={classes.listItem}>
          Sign into the extension
          <br />
          <img
            src={katsudonLogin}
            style={{ paddingTop: "1rem", maxWidth: "100%" }}
            alt="Sign into the extension"
          />
        </li>
        <li style={classes.listItem}>
          If you try to login and nothing changes, then you probably inputted
          details incorrectly.
          <br />
          Otherwise, you should see something like this:
          <br />
          <img
            src={katsudonLoginSuccess}
            style={{ paddingTop: "1rem", maxWidth: "100%" }}
            alt="successfully logged into extension"
          />
        </li>
        <li style={classes.listItem}>
          And you're done! This extension is only able to read off /problem
          pages.
          <br />
          Meaning: it can't track solutions submitted through contests or the
          explore sections of leetcode.
          <br />
          Go to this page to solve some problems:
          <br />
          <a
            href="https://leetcode.com/problemset/all/"
            style={{ color: props.color }}
          >
            https://leetcode.com/problemset/all/
          </a>
          <br />
          <br />
          See solutions of all users (including yours){" "}
          <Link to="/users" style={{ color: props.color }}>
            here
          </Link>
        </li>
      </ol>
    </div>
  );
}
