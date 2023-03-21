import React from "react";
import classes from "./View.module.scss";
import NavBar from "@/modules/common/components/NavBar/NavBar";
import { useRedux } from "@/store/useRedux";
import { logout } from "@/store/reducers/authReducer";
import { PhotoData } from "@/modules/view-data/types/ViewDataTypes";
import MainView from "./containers/MainView/MainView";

function View({ data }: { data: PhotoData[] }) {
  const { dispatch } = useRedux();

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

  return (
    <div className={classes.container}>
      <NavBar options={navBarOptions} variant="black" />
      <MainView data={data} />
    </div>
  );
}

export default View;
