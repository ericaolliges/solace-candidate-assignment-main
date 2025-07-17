import React, { FC, ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <main
      className="col-start-1 col-end-4 
        lg:col-start-2 lg:col-end-7 
        xl:col-start-3 xl:col-end-10
        2xl:col-start-4 2xl:col-end-9
        mr-6 ml-6 flex flex-col"
    >
      {children}
    </main>
  );
};

export default MainContainer;
