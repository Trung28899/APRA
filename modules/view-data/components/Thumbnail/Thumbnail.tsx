import React from "react";
import Image from "next/image";
import classes from "./Thumbnail.module.scss";

function Thumbnail({ source }: { source: string }) {
  return (
    <Image
      src={source}
      height={100}
      width={100}
      alt=""
      className={classes.thumbnail}
    />
  );
}

export default Thumbnail;
