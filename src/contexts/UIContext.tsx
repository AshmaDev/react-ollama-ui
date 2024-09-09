import React, { createContext, useContext, useState } from "react";

interface UIContextProps {
  error: string;
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isPullPopupOpen: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const value = {
    error,
    isSidebarOpen,
    isSettingsOpen,
    isPullPopupOpen,
    setError,
    setIsSidebarOpen,
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
