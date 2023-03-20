import React from "react";
import Image from "next/image";
import classes from "./Thumbnail.module.scss";

interface Props {
  source: string;
  onClick: () => void;
}

function Thumbnail({ source, onClick }: Props) {
  return (
    <Image
      src={source}
      height={100}
      width={100}
      alt=""
      className={classes.thumbnail}
      onClick={onClick}
    />
  );
}

export default Thumbnail;
