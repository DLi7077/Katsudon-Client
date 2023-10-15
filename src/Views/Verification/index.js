import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ReactCodeInput from "react-code-input";
import { useDispatch, useSelector } from "react-redux";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import UserVerificationAPI from "../../Api/UserVerificationAPI";
import {
  startLoading,
  setLoaded,
  stopLoading,
} from "../../Store/Reducers/progress";
import { userLogin } from "../../Store/Reducers/user";
import CircularProgress from "@mui/material/CircularProgress";

const maskedEmail = (email) => {
  const [username, domain] = email.split("@");
  const letters = username.split("");
  const hidden = Math.ceil(0.5 * letters.length);
  for (let idx = 0; idx < hidden; idx++) letters[idx] = "*";

  return letters.join("") + "@" + domain;
};

export default function Verification(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user);
  const progress = useSelector((state) => state.progress);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  async function updateVerification() {
    dispatch(startLoading());
    setVerificationError(false);
    await UserVerificationAPI.createVerification().then(() => {
      setTimeout(() => {
        dispatch(setLoaded());

        setTimeout(() => {
          dispatch(stopLoading());
        }, 600);
      }, 100);
    });
  }

  async function submitVerification(code) {
    setVerificationError(false);
    setVerifying(true);
    try {
      const verifiedUser = await UserVerificationAPI.attemptVerify(code);
      const loginDetails = {
        auth_token: localStorage.getItem("katsudon-lc-auth-token"),
        ...verifiedUser.user,
      };
      dispatch(userLogin(loginDetails));
    } catch (error) {
      setVerificationError(true);
    } finally {
      setTimeout(() => {
        setVerifying(false);
      }, 300);
    }
  }

  useEffect(() => {
    if (!currentUser.logged_in) {
      navigate("/weekly-progress");
      return;
    }
    if (currentUser.verified) {
      navigate("/profile");
      return;
    }

    updateVerification();
    // eslint-disable-next-line
  }, [location, currentUser]);

  const inputFieldProps = {
    inputStyle: {
      fontFamily: "monospace",
      margin: "4px",
      width: "1.75rem",
      borderRadius: "3px",
      fontSize: "14px",
      height: "3rem",
      backgroundColor: "#333333",
      color: "white",
      border: "1px solid #adadad",
    },
  };

  function Benefits() {
    return (
      <div className="align-center" style={{ fontSize: "14px" }}>
        After verifying your account, you can:
        <ul>
          <li>
            Create submissions via the{" "}
            <a
              href="https://chrome.google.com/webstore/detail/katsudon-leetcode-extensi/ncpppllgdfhgndifbpgcpkfolbbjfnol"
              target="_blank"
              rel="noreferrer"
              style={{ color: props.color }}
            >
              Katsudon Leetcode Extension
            </a>
          </li>
          <li>Customize your profile</li>
          <li>Become visible to other users</li>
          <li>Follow other users</li>
        </ul>
      </div>
    );
  }

  return (
    <div
      className="content-container align-down"
      style={{ backgroundColor: props.backgroundColor, alignItems: "center" }}
    >
      <MarkEmailUnreadIcon style={{ fontSize: "4rem" }} />
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Verify your email address
      </div>
      {progress.loaded ? (
        <>
          <div style={{ fontSize: "1.25rem" }}>
            A verification code was sent to {maskedEmail(currentUser.email)}. It
            will expire in 10 minutes.
            <br />
          </div>
          <ReactCodeInput
            type="text"
            value={verificationCode}
            onChange={(code) => setVerificationCode(code)}
            fields={6}
            {...inputFieldProps}
          />
          {verificationError && (
            <div style={{ color: "#FF7A7A", fontSize: "14px" }}>
              Incorrect verification code
            </div>
          )}
          <div className="align-down" style={{ gap: "4px" }}>
            <Button
              style={{
                textTransform: "none",
                fontSize: "14px",
                color: props.text,
                height: "36px",
              }}
              variant="outlined"
              onClick={() => submitVerification(verificationCode)}
            >
              {verifying ? (
                <CircularProgress style={{ height: "24px", width: "24px" }} />
              ) : (
                <>Submit</>
              )}
            </Button>
            <Button
              style={{
                textTransform: "none",
                textDecoration: "underline",
                fontSize: "12px",
                color: props.text,
              }}
              onClick={() => updateVerification()}
            >
              Resend Code
            </Button>
          </div>
        </>
      ) : (
        <div style={{ fontSize: "1.25rem" }}>
          Sending verification code to {maskedEmail(currentUser.email)}...
        </div>
      )}
      <div
        style={{
          width: "90%",
          height: "2px",
          backgroundColor: props.color,
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      />
      <Benefits />
    </div>
  );
}
