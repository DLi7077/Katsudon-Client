import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TitleHeader from "../../Components/Views/TitleHeader";
import { percentToColor } from "../../Components/Codeblock/CodeLength";

function ColorHint() {
  const blueHint = percentToColor(35, 47, 225);
  const greenHint = percentToColor(20, 47, 225);
  const redHint = percentToColor(5, 47, 225);

  const colorHints = [
    { color: blueHint, length: 4 },
    { color: greenHint, length: 12 },
    { color: redHint, length: 18 },
  ];

  const GradientHintList = () =>
    colorHints.map((colorHint, idx) => (
      <div
        key={`colorhint-${idx}`}
        style={{
          width: `${colorHint.length}px`,
          height: "4px",
          backgroundColor: colorHint.color,
        }}
      />
    ));

  return (
    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div className="align-down" style={{ gap: "2px" }}>
        <GradientHintList />
      </div>
      <span>Solution Length</span>
    </span>
  );
}

function Legend() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <TaskAltIcon style={{ fontSize: "1.5rem" }} />
        Solved
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <PanoramaFishEyeIcon
          style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.3)" }}
        />
        Not Solved
      </div>
      <ColorHint />
    </div>
  );
}

export default function WeeklyProgressHeader(props) {
  return (
    <>
      <TitleHeader
        textColor={props.text}
        themeColor={props.color}
        title="Weekly Progress"
      >
        <PersonAddAlt1Icon
          style={{
            fontSize: "1.5rem",
            color: "#7AFF87",
            marginRight: ".25rem",
            verticalAlign: "-0.25rem",
          }}
        />
        Follow others to see how they're progressing this week, and try out
        problems they've solved!
      </TitleHeader>
      <Legend />
    </>
  );
}
