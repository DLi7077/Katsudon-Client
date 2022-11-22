import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function ProgressHeader({ textColor, themeColor }) {
  return (
    <div
      className="align-down"
      style={{
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "1.5rem",
        color: textColor,
        gap: "0.5rem",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>Weekly Progress</span>
      <span
        style={{
          fontSize: "1.25rem",
          color: themeColor,
        }}
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
      </span>
      <div
        style={{
          backgroundColor: themeColor,
          marginTop: "1rem",
          height: "2px",
          width: "90%",
        }}
      />
    </div>
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
    </div>
  );
}

export default function Header(props) {
  return (
    <>
      <ProgressHeader textColor={props.text} themeColor={props.color} />
      <Legend />
    </>
  );
}
