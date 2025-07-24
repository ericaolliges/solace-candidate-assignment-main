"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import Button from "./components/atoms/Button";
import HeaderBar from "./components/atoms/HeaderBar";
import Heading from "./components/atoms/Heading";
import MainContainer from "./components/atoms/MainContainer";
import AdvocateResult from "./components/molecules/AdvocateResult";
import CriteriaSearch from "./components/molecules/CriteriaSearch";

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

// For the purposes of a test assignment with 15 advocates, page size is a hard-coded constant.
// In a real application this would default to a more reasonable number of results and likely
// would be editable in some way by the user.
const PAGE_SIZE = 5;

export default function Home() {
  const [advocates, setAdvocates] = useState<IAdvocate[]>([]);

  const [searchActive, setSearchActive] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");

  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const [count, setCount] = useState(0);

  const searchTypes = [
    {
      key: "specialty",
      value: "Specialty",
    },
    {
      key: "city",
      value: "Location",
    },
    {
      key: "name",
      value: "Name",
    },
  ];

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates();
  }, []);

  const fetchAdvocates = async (customCursor?: number) => {
    const body = JSON.stringify({
      cursor: customCursor ?? cursor,
      pageSize: PAGE_SIZE,
    });

    await fetch("/api/advocates", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    }).then((response) => {
      response.json().then((jsonResponse: IAdvocateData) => {
        setAdvocates(jsonResponse.data);
        setNextCursor(jsonResponse.cursor);
        setCount(jsonResponse.count);
      });
    });
  };

  const searchAdvocates = async (
    searchCriteria: string,
    searchTerm: string,
    customCursor = 0
  ) => {
    const body = JSON.stringify({
      searchCriteria,
      searchTerm,
      cursor: customCursor,
      pageSize: PAGE_SIZE,
    });

    await fetch("/api/advocates/search", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    })
      .then((response) => {
        response
          .json()
          .then((jsonResponse: IAdvocateData) => {
            setAdvocates(jsonResponse.data);

            setSearchCriteria(searchCriteria);
            setSearchTerm(searchTerm);

            setNextCursor(jsonResponse.cursor);
            setCount(jsonResponse.count);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const resetSearch = () => {
    setSearchActive(false);
    setSearchError(false);
    setCursor(0);
    setNextCursor(0);

    setSearchTerm("");
    setSearchCriteria("");
    setAdvocates([]);

    fetchAdvocates();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const searchTermData = formData.get("searchTerm") as string;
    const searchCriteriaName = formData.get("searchType");
    const searchCriteriaData = searchTypes.find(
      (searchType) => searchType.value === searchCriteriaName
    );

    if (!searchTermData || !searchCriteriaData?.key) {
      setSearchError(true);
      return;
    }

    await searchAdvocates(searchCriteriaData?.key, searchTermData);
    setSearchActive(true);

    console.log();
  };

  const loadPreviousAdvocates = () => {
    const newCursor = cursor - PAGE_SIZE >= 0 ? cursor - PAGE_SIZE : 0;
    setCursor(newCursor);

    searchActive
      ? searchAdvocates(searchCriteria, searchTerm, newCursor)
      : fetchAdvocates(newCursor);
  };

  const loadNextAdvocates = () => {
    setCursor(nextCursor);
    searchActive
      ? searchAdvocates(searchCriteria, searchTerm, nextCursor)
      : fetchAdvocates(nextCursor);
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
            <label htmlFor="searchTerm" className="text-lg sm:text-xl">
              Search for an advocate:
            </label>
            <CriteriaSearch
              error={searchError}
              onChange={(event) => {
                if (!!event.target.value) {
                  setSearchError(false);
                }
              }}
            />
            <div className="flex flex-row gap-4 justify-end">
              <Button disabled={!searchActive} onClick={resetSearch}>
                Reset
              </Button>
              <Button type="submit">Search</Button>
            </div>
          </div>
        </form>
        <div className="flex flex-col mb-4 gap-6">{advocateResults}</div>
        <div className="flex flex-row gap-4 mb-24 justify-end">
          <Button disabled={cursor <= 0} onClick={loadPreviousAdvocates}>
            Back
          </Button>
          <Button disabled={nextCursor >= count} onClick={loadNextAdvocates}>
            Next
          </Button>
        </div>
      </MainContainer>
    </>
  );
}
