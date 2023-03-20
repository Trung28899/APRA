import React, { ReactNode } from "react";

interface Props {
  children: string | ReactNode;
  onClick: () => void;
}

function Paragraph({ children, onClick }: Props) {
  return (
    <p style={{ cursor: "pointer" }} onClick={onClick}>
      {children}
    </p>
  );
}

export default Paragraph;
