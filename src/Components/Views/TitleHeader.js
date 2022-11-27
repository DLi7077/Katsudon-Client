import React from "react";

export default function TitleHeader(props) {
  return (
    <div
      className="align-down"
      style={{
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "1.5rem",
        color: props.textColor,
        gap: "0.5rem",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>{props.title}</span>

      <span
        style={{
          fontSize: "1.25rem",
          color: props.color,
        }}
      >
        {props.children}
      </span>
      <div
        style={{
          backgroundColor: props.themeColor,
          marginTop: "1rem",
          height: "2px",
          width: "90%",
        }}
      />
    </div>
  );
}
