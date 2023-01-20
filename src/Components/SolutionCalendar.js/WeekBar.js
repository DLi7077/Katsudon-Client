export default function WeekBar({ week, year, count, firstWeek, color }) {
  return (
    <div
      style={{
        position: "relative",
        height: `${2 + count * 2}px`,
        maxHeight: "100%",
      }}
    >
      <div
        style={{
          width: "min(6px,1vw)",
          height: "100%",
          backgroundColor: count === 0 ? "white" : color,
          maxHeight: "100%",
        }}
      />
      {firstWeek && (
        <div style={{ position: "absolute", bottom: "-16px" }}>{year}</div>
      )}
      {week % 52 === 1 && (
        <div style={{ position: "absolute", bottom: "-16px" }}>{year}</div>
      )}
    </div>
  );
}
