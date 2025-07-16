import React, { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
}

const Button: FC<ButtonProps> = ({ children, onClick, type = "button" }) => {
  return (
    <button
      className="py-2 px-4 bg-purple-800 rounded-lg"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
