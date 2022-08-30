import { get, map, orderBy, reduce } from "lodash";
import "./styles.css";
import "../user.css";

export default function SkillBox(props) {
  const tags = orderBy(
    map(
      reduce(
        props.solved,
        (accumulator, problem) => {
          const problemTags = get(problem, "tags");
          problemTags.forEach((tag) => {
            accumulator[tag] = 1 + (accumulator[tag] || 0);
          });

          return accumulator;
        },
        {}
      ),
      (frequency, tag_name) => {
        return { tag: tag_name, frequency: frequency };
      }
    ),
    ["frequency", "tag"],
    ["desc", "asc"]
  );

  console.log(tags);

  return (
    <div>
      <div className="user-page-section-header"> Skills</div>
      <div
        className="user-page-section-content"
        style={{ backgroundColor: props.backgroundColor ?? "#382E37" }}
      >
        <div className="skill-tag-container">
          {map(tags, (tag, idx) => {
            return (
              <div key={idx} className="skill-tag">
                {tag.tag}: {tag.frequency}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
