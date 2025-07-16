import React, { FC, ReactNode } from "react";

interface NamedTextProps {
  children: ReactNode;
  name: string;
}

const NamedText: FC<NamedTextProps> = ({ children, name }) => {
  return (
    <p className="text-base">
      <span className="font-bold">{name}: </span>
      {children}
    </p>
  );
};

export default NamedText;
