/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DataView from "@/modules/view-data/View";
import axios from "axios";
import type { PhotoData } from "../modules/view-data/types/ViewDataTypes";
import { toastError } from "@/modules/common/utils/toast_helper";
import useLoading from "@/modules/common/hooks/useLoading";
import { useRedux } from "@/store/useRedux";
import { useRouter } from "next/router";

interface Props {
  data: PhotoData[];
  errorMessage: string;
}

function ViewDataRoute({ data, errorMessage }: Props) {
  const { loading_count, resetLoading } = useLoading();
  const { state } = useRedux();
  const router = useRouter();
  const { authenticated } = state.authObject;

  useEffect(() => {
    if (!authenticated) router.push("/");
  }, [authenticated, router]);

  useEffect(() => {
    if (errorMessage) toastError(errorMessage);
    if (loading_count > 0) resetLoading();
  }, []);

  return <DataView data={data} />;
}

export async function getStaticProps() {
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

export default ViewDataRoute;
