"use client";

import _ from "lodash";
import { ISearchBar } from "./types";
import { ChangeEvent } from "react";

export default function useSearchBar({
  endDate,
  startDate,
  search,
  setEndDate,
  setStartDate,
  setSearch,
  refetch,
  setCurrentPage,
}: ISearchBar) {
  let UTCStartDate: string | undefined;
  let UTCEndDate: string | undefined;

  const getDebounce = _.debounce((value) => {
    refetch({
      endDate,
      startDate,
      search: value,
      page: 1,
    });
    setSearch(value);
    setCurrentPage(1);
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      UTCStartDate = undefined;
      return;
    }
    const KSTDate = event.target.value + "T00:00:00+09:00";
    const UTCDate = new Date(KSTDate).toISOString();

    UTCStartDate = UTCDate;
  };

  const onChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      UTCEndDate = undefined;
      return;
    }

    const KSTDate = event.target.value + "T23:59:59+09:00";
    const UTCDate = new Date(KSTDate).toISOString();

    UTCEndDate = UTCDate;
  };

  const onClickSearch = () => {
    setStartDate(() => UTCStartDate);
    setEndDate(() => UTCEndDate);
    refetch({
      endDate,
      startDate,
      search,
      page: 1,
    });
  };

  return {
    onChangeSearch,
    onChangeStartDate,
    onChangeEndDate,
    onClickSearch,
  };
}
