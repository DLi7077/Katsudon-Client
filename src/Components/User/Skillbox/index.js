import { filter, get, map, omit, orderBy, pick, reduce, values } from "lodash";
import SkillTag from "./SkillTag";
import "./styles.css";
import "../user.css";
import { useEffect, useState } from "react";

export default function SkillBox(props) {
  const [tagReference, setTagReference] = useState(
    reduce(
      props.solved,
      (accumulator, problem) => {
        const problemTags = get(problem, "tags");
        problemTags.forEach((tag) => {
          accumulator[tag] = {
            label: tag,
            frequency: 1 + (get(accumulator, `${tag}.frequency`) || 0),
            selected: false,
          };
        });

        return accumulator;
      },
      {}
    )
  );
  const [selectedTags, setSelectedTags] = useState({});
  const [nonSelectedTags, setNonSelectedTags] = useState({});

  function tagsToSelect(tags) {
    return map(
      filter(tags, (tag) => get(tag, "selected")),
      (tag) => get(tag, "label")
    );
  }

  function generateTags(tags) {
    return orderBy(values(tags), ["frequency", "tag"], ["desc", "asc"]);
  }

  function handleAddTags(tag) {
    setTagReference({
      ...tagReference,
      [tag]: {
        ...get(tagReference, tag),
        selected: !get(tagReference, `${tag}.selected`),
      },
    });
  }

  useEffect(() => {
    const toSelect = tagsToSelect(tagReference);
    props.updateSkillQuery(toSelect);

    setSelectedTags(generateTags(pick(tagReference, toSelect)));
    setNonSelectedTags(generateTags(omit(tagReference, toSelect)));
    // eslint-disable-next-line
  }, [tagReference]);

  return (
    <div>
      <div className="user-page-section-header"> Skills</div>
      <div
        className="user-page-section-content"
        style={{ backgroundColor: props.backgroundColor ?? "#382E37" }}
      >
        <div className="skill-tag-container">
          {map(selectedTags, (details, idx) => {
            return (
              <SkillTag
                key={idx}
                tag={details.label}
                frequency={details.frequency}
                selected={details.selected}
                addTags={handleAddTags}
              />
            );
          })}
          {map(nonSelectedTags, (details, idx) => {
            return (
              <SkillTag
                key={idx}
                tag={details.label}
                frequency={details.frequency}
                selected={details.selected}
                addTags={handleAddTags}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
