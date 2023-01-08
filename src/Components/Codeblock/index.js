import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock(props) {
  return (
    <SyntaxHighlighter
      language={props.language}
      style={{...atomDark}}
      showLineNumbers
      lineNumberStyle={{ minWidth: '2rem' }}
    >
      {props.code}
    </SyntaxHighlighter>
  );
}
