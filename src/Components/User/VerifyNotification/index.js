import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function VerifyNotification() {
  const navigate = useNavigate();
  return (
    <div className="notification" onClick={() => navigate("/verification")}>
      <InfoIcon style={{ marginRight: "0.5rem" }} />
      <span>
        Your account is not verified! Verify your account here to be visible to
        others and create submissions.
      </span>
    </div>
  );
}
