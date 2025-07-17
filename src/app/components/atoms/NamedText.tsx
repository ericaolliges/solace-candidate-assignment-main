import React, { FC, ReactNode } from "react";

interface NamedTextProps {
  children: ReactNode;
  name: string;
  className?: string;
}

const NamedText: FC<NamedTextProps> = ({ children, className, name }) => {
  return (
    <p className={`text-base ${className}`}>
      <span className="font-bold">{name}: </span>
      {children}
    </p>
  );
};

export default NamedText;
