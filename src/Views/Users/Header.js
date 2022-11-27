import React from "react";
import TitleHeader from "../../Components/Views/TitleHeader";

export default function Header(props) {
  console.log(props);
  return (
    <TitleHeader
      textColor={props.text}
      themeColor={props.color}
      title="Katsudon Users"
    >
        Look for your friends here
    </TitleHeader>
  );
}
