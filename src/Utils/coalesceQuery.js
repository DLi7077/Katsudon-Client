import { omit, reduce } from "lodash";

export default function coalesceQuery(queryParams, nullableKeys) {
  const coalescedQuery = reduce(
    queryParams,
    (builtQuery, value, key) => {
      if (key === "tags" && !value.length) return omit(builtQuery, key);
      if (key === "difficulty" && !value) return omit(builtQuery, key);
      return builtQuery;
    },
    queryParams
  );

  return coalescedQuery;
}
