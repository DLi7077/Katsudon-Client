import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock(props) {
  return (
    <SyntaxHighlighter
      language={props.language}
      style={atomDark}
      showLineNumbers
      lineNumberStyle={{ minWidth: 0 }}
      showInlineLineNumbers
    >
      {props.code}
    </SyntaxHighlighter>
  );
}
