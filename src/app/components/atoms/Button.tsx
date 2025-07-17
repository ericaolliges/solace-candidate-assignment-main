import React, { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
}

const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className="py-2 px-4 bg-purple-800 rounded-lg hover:bg-purple-700 disabled:bg-gray-500"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
