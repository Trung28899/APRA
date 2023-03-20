import React, { useState } from "react";
import classes from "./View.module.scss";
import Image from "next/image";
import Table from "../common/components/Table/Table";
import SearchIcon from "@/public/search.svg";
import NavBar from "@/modules/common/components/NavBar/NavBar";
import { useRedux } from "@/store/useRedux";
import { logout } from "@/store/reducers/authReducer";
import { PhotoData, PhotoRow } from "@/modules/view-data/types/ViewDataTypes";
import Thumbnail from "./components/Thumbnail/Thumbnail";
import useViewData from "./hooks/useViewData";
import Input from "../common/components/Input/Input";
import Button from "../common/components/Button/Button";
import ClickableParagraph from "./components/Paragraph/ClickableParagraph";
import useModal from "../common/hooks/useModal";
import Modal from "../common/components/Modal/Modal";
import ModalContainer from "./containers/ModalContainer";

function View({ data }: { data: PhotoData[] }) {
  const { dispatch } = useRedux();
  const [modalDetails, setModalDetails] = useState<PhotoData>();
  const { modalOpen, openModal, closeModal } = useModal();
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
