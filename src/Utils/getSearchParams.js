import { get, reduce } from "lodash";

/**
 * @description Provides the search params given an -useLocation- search
 * @param {any} location - value of useLocation() in component
 * @returns {any} queryParams Object
 */
export default function getSearchParams(location) {
  const params = get(location, "search").substring(1);
  const queryParams = reduce(
    params.split("&"),
    (accumulator, curr) => {
      if (!curr) return accumulator;
      const [key, value] = curr.split("=");
      accumulator[key] = value;

      return accumulator;
    },
    {}
  );

  return queryParams;
}
