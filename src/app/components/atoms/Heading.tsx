import React, { FC, ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textSize?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: FC<HeadingProps> = ({ children, level, textSize }) => {
  let headingClassName: string;
  switch (textSize ?? level) {
    case 1:
      headingClassName = "text-4xl sm:text-5xl";
      break;
    case 2:
      headingClassName = "text-3xl sm:text-4xl";
      break;
    case 3:
      headingClassName = "text-2xl sm:text-3xl";
      break;
    case 4:
      headingClassName = "text-xl sm:text-2xl";
      break;
    case 5:
      headingClassName = "text-lg sm:text-xl";
      break;
    case 6:
      headingClassName = "text-base sm:text-lg";
      break;
  }

  switch (level) {
    case 1:
      return <h1 className={headingClassName}>{children}</h1>;
    case 2:
      return <h2 className={headingClassName}>{children}</h2>;
    case 3:
      return <h3 className={headingClassName}>{children}</h3>;
    case 4:
      return <h4 className={headingClassName}>{children}</h4>;
    case 5:
      return <h5 className={headingClassName}>{children}</h5>;
    case 6:
      return <h6 className={headingClassName}>{children}</h6>;
  }
};

export default Heading;
