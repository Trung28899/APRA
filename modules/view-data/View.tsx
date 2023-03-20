import React, { useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./View.module.scss";
import Image from "next/image";

import Table from "../common/components/Table/Table";
import SearchIcon from "@/public/search.svg";
import NavBar from "@/modules/common/components/NavBar/NavBar";
import { useRedux } from "@/store/useRedux";
import { logout } from "@/store/reducers/authReducer";
import { PhotoData } from "@/modules/view-data/types/ViewDataTypes";
import Thumbnail from "./components/Thumbnail/Thumbnail";
import useViewData from "./hooks/useViewData";
import Input from "../common/components/Input/Input";
import Button from "../common/components/Button/Button";

function View({ data }: { data: PhotoData[] }) {
  const { state, dispatch } = useRedux();
  const { authenticated } = state.authObject;
  const router = useRouter();
  const { photoData, onChangeInput, inputValue, onKeyDownInput, search } =
    useViewData(data);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Thumbnail", key: "thumbnailImage" },
  ];

  const navBarOptions = [
    {
      label: "Data View",
      route: "/view-data",
      active: true,
    },
    {
      label: "Log Out",
      route: "/",
      onClick: () => dispatch(logout()),
    },
  ];

  useEffect(() => {
    if (!authenticated) router.push("/");
  }, [authenticated, router]);

  const processData = photoData.map((dataObject) => {
    return {
      ...dataObject,
      thumbnailImage: <Thumbnail source={dataObject.thumbnailUrl} />,
    };
  });

  return (
    <div className={classes.container}>
      <NavBar options={navBarOptions} variant="black" />
      <div className={classes.inputContainer}>
        <Input
          placeholder="Search keywords on title"
          variant="outline"
          onChange={onChangeInput}
          value={inputValue}
          onKeyDown={onKeyDownInput}
        />

        <Button
          variant="outline"
          size="large"
          className={classes.buttonStyles}
          onClick={search}
        >
          <Image src={SearchIcon} alt="" />
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <Table
          itemsPerPagePagination={5}
          data={processData}
          columnFields={columns}
        />
      </div>
    </div>
  );
}

export default View;
