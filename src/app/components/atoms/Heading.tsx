import React, { FC, ReactNode } from "react";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

const Heading: FC<HeadingProps> = ({ children, level }) => {
  switch (level) {
    case 1:
      return <h1 className="text-5xl">{children}</h1>;
    case 2:
      return <h2 className="text-4xl">{children}</h2>;
    case 3:
      return <h3 className="text-3xl">{children}</h3>;
    case 4:
      return <h4 className="text-2xl">{children}</h4>;
    case 5:
      return <h5 className="text-xl">{children}</h5>;
    case 6:
      return <h6 className="text-lg">{children}</h6>;
  }
};

export default Heading;
