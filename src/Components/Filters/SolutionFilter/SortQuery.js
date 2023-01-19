import { FormControl, Select, MenuItem, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function SortQuery(props) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 90, color: "white" }} size="small">
          <Select
            variant="standard"
            value={props.sortBy}
            sx={{
              fontSize: "1.25rem",
              color: "white",
            }}
            label="Difficulty"
            onChange={(e) => {
              const selectedSortBy = e.target.value;
              props.setSortBy(selectedSortBy);
            }}
          >
            <MenuItem value="created_at" sx={{ fontSize: "1.15rem" }}>
              Solved At
            </MenuItem>
            <MenuItem value="problem_id" sx={{ fontSize: "1.15rem" }}>
              Problem ID
            </MenuItem>
          </Select>
        </FormControl>
        <div
          style={{
            position: "absolute",
            top: "-4px",
            left: "8px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Sort by
        </div>
      </div>
      <IconButton
        style={{ color: "white", fontSize: "1.5rem", padding: "0.25rem" }}
        onClick={() => {
          props.setSortDir(props.sortDir === "asc" ? "desc" : "asc");
        }}
      >
        {props.sortDir === "asc" && <ArrowUpwardIcon />}
        {props.sortDir === "desc" && <ArrowDownwardIcon />}
      </IconButton>
    </div>
  );
}
