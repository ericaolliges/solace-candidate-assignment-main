import React, { FC } from "react";
import Avatar from "boring-avatars";

import NamedText from "../atoms/NamedText";
import { IAdvocate } from "@/app/page";
import Heading from "../atoms/Heading";

interface AdvocateResultProps extends IAdvocate {}

const AdvocateResult: FC<AdvocateResultProps> = ({
  city,
  degree,
  firstName,
  lastName,
  phoneNumber,
  specialties,
  yearsOfExperience,
}) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="p-8 rounded-lg w-full flex flex-row gap-8 border-2 bg-slate-950">
      <Avatar name={fullName} className="size-24" />
      <div className="flex flex-col gap-2">
        <Heading level={3}>{fullName}</Heading>
        <NamedText name="Location">{city}</NamedText>
        <NamedText name="Degree">{degree}</NamedText>
        <NamedText name="Years of Experience">{yearsOfExperience}</NamedText>
        <NamedText name="Phone Number">{phoneNumber}</NamedText>
      </div>
    </div>
  );
};

export default AdvocateResult;
