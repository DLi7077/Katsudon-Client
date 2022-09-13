import React from "react";

const tagStyle = {
  width: "fit-content",
  backgroundColor: "#e9ecef",
  color: "black",
  fontSize: "1.15rem",
  textTransform: "none",
  padding: "0.25rem",
  paddingInline: "1rem",
  border: 0,
  borderRadius: "16px",
};

export default function SkillTag(props) {
  return (
    <button
      style={{
        ...tagStyle,
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
    </button>
  );
}
