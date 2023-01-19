import SkillBox from "./Skillbox";
import QueryLabel from "./QueryLabel";

const classes = {
  problemTags: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "1rem",
    width: "100%",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflowY: "scroll",
  },
};

export default function ProblemTagFilter(props) {
  return (
    <div style={{ marginInline: "1rem" }}>
      <QueryLabel style={{ marginBottom: "0.5rem" }}>Problem Tags</QueryLabel>
      <div style={classes.problemTags}>
        <SkillBox
          solved={props.solved}
          selectedTags={props.problemTags}
          updateSkillQuery={props.updateSkillQuery}
        />
      </div>
    </div>
  );
}
