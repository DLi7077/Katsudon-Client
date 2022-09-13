import React from "react";
import { map } from "lodash";

export default function Tagblock(props) {
  return (
    <div className="tag-container">
      {map(props.problemTags, (tag, idx) => {
        return <div key={idx}>{tag}</div>;
      })}
    </div>
  );
}
