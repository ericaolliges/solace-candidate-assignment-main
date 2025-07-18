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
    <div className="p-8 rounded-lg w-full border-2 bg-slate-950">
      <div className="flex flex-row gap-8">
        <Avatar name={fullName} className="size-24 flex-shrink-0" />
        <div className="flex flex-col gap-2 mb-4 lg:flex-shrink-0">
          <Heading level={2}>{fullName}</Heading>
          <NamedText name="Location">{city}</NamedText>
          <NamedText name="Degree">{degree}</NamedText>
          <NamedText name="Years of Experience">{yearsOfExperience}</NamedText>
          <NamedText name="Phone Number">{phoneNumber}</NamedText>
        </div>
        <NamedText name="Specialties" className="hidden lg:inline">
          {specialties.join(", ")}
        </NamedText>
      </div>
      <NamedText name="Specialties" className="lg:hidden">
        {specialties.join(", ")}
      </NamedText>
    </div>
  );
};

export default AdvocateResult;
