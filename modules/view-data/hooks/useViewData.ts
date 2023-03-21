/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  useMemo,
} from "react";

import { PhotoData } from "@/modules/view-data/types/ViewDataTypes";
import useLoading from "@/modules/common/hooks/useLoading";
import { useQuery } from "@apollo/client";
import { FIND_PHOTO } from "../querries/photos";
import { filterData } from "../utils/data_helpers";
interface ViewDataType {
  photoData: PhotoData[];
  inputValue: string;
  onKeyDownInput: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
}

// Handling input events and side effects
const useViewData = (originalData: PhotoData[]): ViewDataType => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { startLoading, endLoading } = useLoading();

  const queryVariable = useMemo(() => {
    const limit = searchKeywords === "" ? 15 : 5000;
    return {
      variables: { searchTerm: searchKeywords, limit: limit },
    };
  }, [searchKeywords]);

  const { loading, data } = useQuery(FIND_PHOTO, queryVariable);

  function search() {
    setSearchKeywords(inputValue);
  }

  function onKeyDownInput(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") search();
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    if (loading) startLoading();
    if (!loading) endLoading();
  }, [loading]);

  const photoData = useMemo(() => {
    return filterData(data?.photos?.data || originalData || [], searchKeywords);
  }, [data, searchKeywords]);

  return {
    photoData: photoData,
    inputValue,
    onKeyDownInput,
    onChangeInput,
    search,
  };
};

export default useViewData;
