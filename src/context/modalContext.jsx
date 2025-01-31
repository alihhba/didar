/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useContext, useState } from "react";

const defaultValue = {
  isModalOpen: false,
  modalType: "",
  data: {},
  changeModalHandler: () => {},
};

const ModalContext = createContext(defaultValue);

export const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [data, setData] = useState();

  const changeModalHandler = ({
    isModal = false,
    modalType = "",
    data = {},
  }) => {
    setIsModalOpen(isModal);
    setModalType(modalType);
    setData(data);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalType,
        changeModalHandler,
        data,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
