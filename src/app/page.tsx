"use client";

import { useEffect, useState } from "react";

interface IAdvocate {
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

  return (
    <>
      <header className="h-32 bg-purple-900 col-start-1 col-end-4 md:col-end-8 xl:col-end-12 flex justify-center items-center mb-8">
        <h1 className="text-3xl">Solace Advocates</h1>
      </header>
      <main className="col-start-1 col-end-4 md:col-start-2 md:col-end-7 xl:col-start-3 xl:col-end-10 mr-4 ml-4 md:mr-0 md:ml-0">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col  mb-16 gap-2">
            <label htmlFor="searchTerm">Search</label>
            <input
              type="text"
              id="searchTerm"
              onChange={onChange}
              className="bg-transparent border-2 rounded-lg p-1"
            />
            <div className="flex flex-row gap-4 justify-end">
              <button onClick={resetSearch}>Reset</button>
              <button type="submit"> Search</button>
            </div>
          </div>
        </form>

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
        <div className="flex flex-row gap-4 justify-end">
          {cursor > 0 && <button onClick={loadPreviousAdvocates}>Back</button>}
          {nextCursor < count && (
            <button onClick={loadNextAdvocates}>Next</button>
          )}
        </div>
      </main>
    </>
  );
}
