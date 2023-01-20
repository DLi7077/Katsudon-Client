import React from "react";

export default function HelperLabel(props) {
  return (
    <div
      style={{
        top: "-4px",
        left: "8px",
        color: "rgba(255,255,255,0.6)",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
