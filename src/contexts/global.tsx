"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { GlobalContext as GlobalContextType } from "@/types";

export const GlobalContext = createContext<GlobalContextType>({
  workingText: "",
  setWorkingText: () => {},
  modalText: "",
  setModalText: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workingText, setWorkingText] = useState("");
  const [modalText, setModalText] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        workingText,
        setWorkingText,
        modalText,
        setModalText,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
