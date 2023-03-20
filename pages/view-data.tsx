/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import View from "@/modules/view-data/View";
import axios from "axios";
import type { PhotoData } from "../modules/view-data/types/ViewDataTypes";
import { toastError } from "@/modules/common/utils/toast_helper";

interface Props {
  data: PhotoData[];
  errorMessage: string;
}

function ViewData({ data, errorMessage }: Props) {
  useEffect(() => {
    if (errorMessage) toastError(errorMessage);
  }, []);

  return <View data={data} />;
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(
      "http://jsonplaceholder.typicode.com/photos?_start=0&_limit=15"
    );
    return {
      props: {
        data: res.data,
        errorMessage: "",
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: [],
        errorMessage: error.message
          ? error.message
          : "An error occurred while fetching data.",
      },
    };
  }
}

export default ViewData;
