import { map } from "lodash";

export default function kebabToTitleCase(title) {
  const isNumber = (value) => !isNaN(value);

  const TitleCase = map(title.split("-"), (word) => {
    if (word.length < 3 || isNumber(word[0])) {
      return word;
    }
    const updatedTitle = word[0].toUpperCase() + word.substr(1);
    // titlePart[0] = titlePart  [0].toUpperCase();
    return updatedTitle;
  }).join(" ");

  return TitleCase;
}

//212-word-search-ii
//212,word,search,ii
//212 Word Search II
