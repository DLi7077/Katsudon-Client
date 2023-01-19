import React from "react";

import { PROBLEM_DIFFICULTY } from "../../../Constants/colors";
import { FormControl, Select, MenuItem } from "@mui/material";
import { map } from "lodash";
import QueryLabel from "./QueryLabel";

export default function DifficultyFilter(props) {
  return (
    <div style={{ position: "relative" }}>
      <FormControl sx={{ m: 1, minWidth: 90, color: "white" }} size="small">
        <Select
          variant="standard"
          value={props.difficulty ?? "All"}
          sx={{
            fontSize: "1.25rem",
            color: PROBLEM_DIFFICULTY[props.difficulty] ?? "white",
          }}
          label="Difficulty"
          onChange={(e) => {
            const selectedDifficulty = e.target.value;
            props.setDifficulty(selectedDifficulty);
          }}
        >
          <MenuItem value="All" sx={{ fontSize: "1.15rem" }}>
            All
          </MenuItem>
          {map(PROBLEM_DIFFICULTY, (color, difficulty) => {
            return (
              <MenuItem
                key={`difficulty-menu-item-${difficulty}`}
                value={difficulty}
                sx={{ color: color, fontSize: "1.15rem" }}
              >
                {difficulty}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <QueryLabel style={{ position: "absolute" }}>Difficulty</QueryLabel>
    </div>
  );
}
