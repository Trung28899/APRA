/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
import { PhotoData } from "@/modules/view-data/types/ViewDataTypes";
import { fetchPhotoBySearchTerms } from "../api/api";
import useLoading from "@/modules/common/hooks/useLoading";
import { toastError } from "@/modules/common/utils/toast_helper";

const useViewData = (originalData: PhotoData[]) => {
  const [photoData, setPhotoData] = useState<PhotoData[]>(originalData || []);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { startLoading, endLoading } = useLoading();

  function search() {
    setSearchKeywords(inputValue);
    if (inputValue === "") setPhotoData(originalData);
  }

  function onKeyDownInput(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") search();
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    if (searchKeywords) setSearchKeywords("");
  }

  useEffect(() => {
    const searchBySearchTerm = async (keywords: string) => {
      startLoading();
      try {
        const res = await fetchPhotoBySearchTerms(keywords);
        setPhotoData(res.data);
      } catch (error: any) {
        if (error.message) toastError(error.message);
        if (!error.message) toastError("An error has occured");
      }
      endLoading();
    };

    if (searchKeywords) searchBySearchTerm(searchKeywords);
  }, [searchKeywords, originalData, inputValue]);

  return {
    photoData,
    inputValue,
    onKeyDownInput,
    onChangeInput,
    search,
  };
};

export default useViewData;
