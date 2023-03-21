import React, { useState } from "react";
import classes from "./MainView.module.scss";
import Image from "next/image";
import Table from "../../../common/components/Table/Table";
import SearchIcon from "@/public/search.svg";
import { PhotoData, PhotoRow } from "@/modules/view-data/types/ViewDataTypes";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import useViewData from "../../hooks/useViewData";
import Input from "../../../common/components/Input/Input";
import Button from "../../../common/components/Button/Button";
import ClickableParagraph from "../../components/Paragraph/ClickableParagraph";
import useModal from "../../../common/hooks/useModal";
import Modal from "../../../common/components/Modal/Modal";
import ModalContainer from "../../containers/ModalContainer/ModalContainer";

function View({ data }: { data: PhotoData[] }) {
  const [modalDetails, setModalDetails] = useState<PhotoData>();
  const { modalOpen, openModal, closeModal } = useModal();
  const { photoData, onChangeInput, inputValue, onKeyDownInput, search } =
    useViewData(data);

  const columns = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Thumbnail", key: "thumbnailImage" },
  ];

  const processData: PhotoRow[] = photoData.map((dataObject) => {
    const setDetails = () => {
      setModalDetails(dataObject);
      openModal();
    };

    return {
      id: (
        <ClickableParagraph onClick={setDetails}>
          {dataObject.id}
        </ClickableParagraph>
      ),
      title: (
        <ClickableParagraph onClick={setDetails}>
          {dataObject.title}
        </ClickableParagraph>
      ),
      thumbnailImage: (
        <Thumbnail source={dataObject.thumbnailUrl} onClick={setDetails} />
      ),
    };
  });

  return (
    <div>
      <div className={classes.inputContainer}>
        <Input
          placeholder="Search keywords on title"
          variant="outline"
          onChange={onChangeInput}
          value={inputValue}
          onKeyDown={onKeyDownInput}
          style={{ textAlign: "center" }}
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

      <Modal
        show={modalOpen}
        closeModal={closeModal}
        modalClassName={classes.modalContainer}
      >
        <ModalContainer data={modalDetails} closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default View;
