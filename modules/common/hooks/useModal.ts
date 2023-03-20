import { useState } from "react";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return {
    modalOpen,
    closeModal: () => setModalOpen(false),
    openModal: () => setModalOpen(true),
  };
};

export default useModal;
