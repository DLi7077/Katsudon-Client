import React from "react";
import "./styles.css";

export default function SkillTag(props) {
  return (
    <div
      className="skill-tag"
      style={{
        ...(props.selected && {
          color: "white",
          backgroundColor: "#18171C",
        }),
      }}
      onClick={() => {
        props.addTags(props.tag);
      }}
    >
      {props.tag}: {props.frequency}
    </div>
  );
}
