import React, { useState } from "react";
import Image from "next/image";
import { PhotoData } from "../../types/ViewDataTypes";
import classes from "./ModalContainer.module.scss";
import CloseIcon from "@/public/close.svg";

interface Props {
  closeModal: () => void;
  data?: PhotoData;
}

function ImageModal({ data, closeModal }: Props) {
  return (
    <div>
      <div className={classes.topContainer}>
        <p>{data?.title}</p>
        <Image
          src={CloseIcon}
          alt=""
          className={classes.closeButton}
          onClick={closeModal}
        />
      </div>
      {
        <div className={classes.imageContainer}>
          <Image
            src={data?.thumbnailUrl || ""}
            alt=""
            width={100}
            height={100}
            className={classes.mainImage}
            loading="lazy"
          />
        </div>
      }
    </div>
  );
}

export default ImageModal;
