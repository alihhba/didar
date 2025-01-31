import { ModalContextProvider } from "@/context/modalContext";
import React from "react";

const ContextProvider = ({ children }) => {
  return (
    <div>
      <ModalContextProvider>{children}</ModalContextProvider>
    </div>
  );
};

export default ContextProvider;
