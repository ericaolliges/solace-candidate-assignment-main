import React, { ChangeEventHandler, FC } from "react";

const CriteriaSearch: FC<{
  error: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ error, onChange }) => {
  return (
    <div className="flex flex-row gap-4 w-full items-start">
      <select
        className="bg-transparent border-b-2 pt-2 pb-2 basis-1/4"
        name="searchType"
      >
        <option selected>Specialty</option>
        <option>Location</option>
        <option>Name</option>
      </select>
      <div className="flex flex-col basis-3/4">
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          onChange={onChange}
          className="bg-slate-950 border-2 rounded-lg pt-1 pr-2 pb-1 pl-2"
        />
        {error && <p className="text-red-500">Search is required</p>}
      </div>
    </div>
  );
};

export default CriteriaSearch;
