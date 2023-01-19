export default function WeekBar({ week, year, count, firstWeek }) {
  return (
    <div
      style={{
        position: "relative",
        height: `${count * 2}px`,

        maxHeight: "100%",
      }}
    >
      <div
        style={{
          width: "min(6px,1vw)",
          height: "100%",
          backgroundColor: "white",
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
