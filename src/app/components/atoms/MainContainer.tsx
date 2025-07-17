import React, { FC, ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <main
      className="col-start-1 col-end-4 
        xl:col-start-2 xl:col-end-7 
        2xl:col-start-3 2xl:col-end-10
        mr-6 ml-6 xl:mr-0 xl:ml-0 flex flex-col"
    >
      {children}
    </main>
  );
};

export default MainContainer;
