import { IAdvocate } from "@/app/page";
import React, { FC } from "react";
import NamedText from "../atoms/NamedText";

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
  return (
    <div className="p-8 rounded-lg w-full flex flex-col gap-2 border-2 bg-slate-950">
      <NamedText name="Name">
        {firstName} {lastName}
      </NamedText>
    </div>
  );
};

export default AdvocateResult;
