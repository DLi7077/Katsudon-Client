import React from "react";
import WeekBar from "./WeekBar";

export default function SolutionCalendar(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "3px",
        backgroundColor: "rgba(0,0,0,0.25)",
        padding: "1.5rem",
        height: "200px",
      }}
    >
      {props.calendar.map((instance, idx) => {
        const { week, year, count } = instance;
        return (
          <WeekBar
            key={`${week}-${year}-${count}`}
            firstWeek={idx === 0}
            count={count}
            year={year}
            week={week}
          />
        );
      })}
    </div>
  );
}
