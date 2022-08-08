import { CopyBlock, vs2015 } from "react-code-blocks";

export default function CodeBlock(props) {
  return (
    <CopyBlock
      text={props.code}
      language="cpp"
      theme={vs2015}
      showLineNumbers={true}
      startingLineNumber={0}
      wrapLines={false}
    />
  );
}
