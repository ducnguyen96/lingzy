"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GlobalLoadingProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  toggleLoading: () => void;
}

const defaultContext: GlobalLoadingProps = {
  loading: false,
  setLoading: () => {},
  toggleLoading: () => {},
};

const GlobalLoadingContext = createContext<GlobalLoadingProps>(defaultContext);

export const useGlobalLoading = () => useContext(GlobalLoadingContext);

export const GlobalLoadingProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => setLoading(!loading);

  return (
    <GlobalLoadingContext.Provider
      value={{ loading, setLoading, toggleLoading }}
    >
      {children}
    </GlobalLoadingContext.Provider>
  );
};
