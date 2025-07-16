import React, { FC, ReactNode } from "react";

interface HeaderBarProps {
  children: ReactNode;
}

const HeaderBar: FC<HeaderBarProps> = ({ children }) => {
  return (
    <header className="h-32 bg-purple-900 col-start-1 col-end-4 md:col-end-8 xl:col-end-12 flex justify-center items-center mb-8">
      {children}
    </header>
  );
};

export default HeaderBar;
