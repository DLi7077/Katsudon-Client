import { get, reduce, map, sortBy } from "lodash";
import kebabToTitleCase from "../utils/kebabToTitleCase";
import api from "./Api";

async function getRepositoryFiles(repository) {
  const request = {
    method: "get",
    endpoint: "repository-files",
    params: {
      repository: repository,
    },
  };

  return await api(request).then((res) => {
    const file_names = get(res.data, "rows");
    const CaptialTitles = map(file_names, (title) => {
      //O(n)
      return { value: title, label: kebabToTitleCase(title) };
    });
    const isNumber = (value) => !isNaN(value);

    const TitleSortByNumber = sortBy(
      //O(nlogn)
      reduce(
        //O(n)
        CaptialTitles,
        (accumulator, title) => {
          const { label, value } = title;
          if (!isNumber(label[0])) return accumulator;
          let firstSpaceIdx = label.indexOf(" ");
          accumulator.push({
            label: [
              parseInt(label.substring(0, firstSpaceIdx)) ?? 0,
              label.substring(firstSpaceIdx + 1),
            ],
            value: value,
          });
          return accumulator;
        },
        []
      ),
      ["label.0"]
    );

    return {
      count: get(res.data, "count"),
      rows: TitleSortByNumber,
    };
  });
}

async function getSolutionFile(repository, fileName) {
  const request = {
    method: "get",
    endpoint: "solution-file",
    params: {
      repository: repository,
      file_name: fileName,
    },
  };

  return await api(request).catch(() => {
    return {
      data: { solution: "Error: file not found" },
    };
  });
}

export default {
  getRepositoryFiles,
  getSolutionFile,
};
