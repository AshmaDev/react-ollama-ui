import React, { createContext, useContext, useState } from "react";

interface UIContextProps {
  error: string;
  isSettingsOpen: boolean;
  isPullPopupOpen: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPullPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UIProviderProps {
  children: React.ReactNode;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: UIProviderProps) => {
  const [isPullPopupOpen, setIsPullPopupOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const value = {
    error,
    isSettingsOpen,
    isPullPopupOpen,
    setError,
    setIsSettingsOpen,
    setIsPullPopupOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};
