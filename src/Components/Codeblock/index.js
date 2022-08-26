import { CopyBlock, vs2015 } from "react-code-blocks";

export default function CodeBlock(props) {
  return (
    <CopyBlock
      text={props.code}
      language={props.language}
      theme={vs2015}
      showLineNumbers={true}
      // wrapLines={false}
    />
  );
}
