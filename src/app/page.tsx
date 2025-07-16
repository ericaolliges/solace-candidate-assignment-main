"use client";

import { useEffect, useMemo, useState } from "react";

import HeaderBar from "./components/atoms/HeaderBar";
import Heading from "./components/atoms/Heading";
import MainContainer from "./components/atoms/MainContainer";
import AdvocateResult from "./components/molecules/AdvocateResult";
import Button from "./components/atoms/Button";

export interface IAdvocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

interface IAdvocateData {
  data: IAdvocate[];
  cursor: number;
  count: number;
}

const PAGE_SIZE = 5;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [advocates, setAdvocates] = useState<IAdvocate[]>([]);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);

  const fetchAdvocates = async (customCursor?: number) => {
    const body = JSON.stringify({
      cursor: customCursor ?? cursor,
      pageSize: PAGE_SIZE,
    });

    setLoading(true);
    await fetch("/api/advocates", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    })
      .then((response) => {
        response.json().then((jsonResponse: IAdvocateData) => {
          setAdvocates(jsonResponse.data);
          setNextCursor(jsonResponse.cursor);
          setCount(jsonResponse.count);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChange = (e) => {
    const searchTerm = e.target.value;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience === searchTerm
      );
    });
  };

  const resetSearch = () => {
    setLoading(true);
    setCursor(0);
    setAdvocates([]);
    fetchAdvocates();
  };

  const onSubmit = () => {};

  const loadPreviousAdvocates = () => {
    const newCursor = cursor - PAGE_SIZE >= 0 ? cursor - PAGE_SIZE : 0;
    setCursor(newCursor);
    fetchAdvocates(newCursor);
  };

  const loadNextAdvocates = () => {
    setCursor(nextCursor);
    fetchAdvocates(nextCursor);
  };

  const advocateResults = useMemo(() => {
    return advocates.map((advocate) => {
      return <AdvocateResult key={advocate.id} {...advocate} />;
    });
  }, [advocates]);

  return (
    <>
      <HeaderBar>
        <Heading level={1}>Solace Advocates</Heading>
      </HeaderBar>
      <MainContainer>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col mb-20 gap-3">
            <label htmlFor="searchTerm">Search</label>
            <input
              type="text"
              id="searchTerm"
              onChange={onChange}
              className="bg-slate-950 border-2 rounded-lg p-1"
            />
            <div className="flex flex-row gap-4 justify-end">
              <Button onClick={resetSearch}>Reset</Button>
              <Button type="submit"> Search</Button>
            </div>
          </div>
        </form>

        <div className="flex flex-col mb-16 gap-6">{advocateResults}</div>
        <table>
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </thead>
          <tbody>
            {advocates.map((advocate) => {
              return (
                <tr>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    {advocate.specialties.map((s) => (
                      <div>{s}</div>
                    ))}
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-row gap-4 mb-24 justify-end">
          {cursor > 0 && <Button onClick={loadPreviousAdvocates}>Back</Button>}
          {nextCursor < count && (
            <Button onClick={loadNextAdvocates}>Next</Button>
          )}
        </div>
      </MainContainer>
    </>
  );
}
