import React from "react";
import "./progress.css";
export default function ProgressBar({ loading, loaded, color }) {
  const loadingStatus =
    (loading ? "loading" : "") + " " + (loading && loaded ? "loaded" : "");

  return <div className={loadingStatus} style={{ backgroundColor: color }} />;
}
