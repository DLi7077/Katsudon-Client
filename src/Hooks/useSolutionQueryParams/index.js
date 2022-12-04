import { useState } from "react";

export function useSolutionQueryParams(
  defaultSortBy, // skill tags
  defaultSortDir // asc or desc
) {
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortDir, setSortDir] = useState(defaultSortDir);

  const changeSortBy = (sortBy) => {
    setSortBy(sortBy);
  };
  const changeSortDir = () => {
    const updatedDir = sortDir === "asc" ? "desc" : "asc";
    setSortDir(updatedDir);
  };

  return {
    sortBy,
    sortDir,
    changeSortBy,
    changeSortDir,
  };
}
