import React from "react";
import InfoIcon from "@mui/icons-material/Info";

export default function VerifyNotification() {
  return (
    <div
      style={{
        backgroundColor: "rgb(48 48 48)",
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        border: "1px solid rgb(122, 122, 122)",
        fontSize: "13px",
        marginBottom: "1rem",
      }}
    >
      <InfoIcon style={{ marginRight: "0.5rem" }} />
      <span>
        Your account is not verified! Verify your account here to be visible to
        others and create submissions.
      </span>
    </div>
  );
}
