import React from "react";
import "./styles.css";

export default function SkillTag(props) {
  return (
    <div
      className="skill-tag"
      style={{
        color: "white",
        ...(props.selected
          ? { backgroundColor: "#ba5d8d" }
          : { backgroundColor: "#3d3d3d" }),
      }}
      onClick={() => {
        props.addTags(props.tag);
      }}
    >
      {props.tag}: {props.frequency}
    </div>
  );
}
