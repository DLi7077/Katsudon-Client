import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Markup } from "react-render-markup";
import { get, keys, without } from "lodash";
import CodeBlock from "../Codeblock";
import TabGroup from "../TabGroup";
import { LANGUAGE_COMPILE_MAPPING } from "../../Constants/language";
import { PROBLEM_DIFFICULTY } from "../../Constants/colors";
import "./styles.css";

export default function SolutionModal(props) {
  const { problem, solutions } = props;
  const solutionLanguages = without(keys(solutions), "recent");
  const solutionTabs = solutionLanguages.map((language) => {
    const solutionDetails = get(solutions, language);
    const runtime = get(solutionDetails, "runtime_ms");
    const memory = get(solutionDetails, "memory_usage_mb");

    return {
      label: language,
      content: (
        <div className="solution-code">
          <div style={{ padding: "1rem" }}>
            Runtime: {runtime} ms <br />
            Memory Usage: {memory} MB
          </div>
          <CodeBlock
            code={get(solutions, `${language}.solution_code`)}
            language={LANGUAGE_COMPILE_MAPPING[language]}
          />
        </div>
      ),
    };
  });

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="solution-container">
        <div className="problem-block">
          <div className="modal-content">
            <a
              href={problem.url}
              target="_blank"
              rel="noreferrer"
              className="leetcode-title"
              style={{ color: PROBLEM_DIFFICULTY[problem.difficulty] }}
            >
              {problem.id}. {problem.title}
            </a>
            <Markup markup={problem.description} />
          </div>
        </div>
        <div className="solution-block">
          <div className="modal-content">
            <TabGroup
              tabs={solutionTabs}
              color={PROBLEM_DIFFICULTY[problem.difficulty]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
