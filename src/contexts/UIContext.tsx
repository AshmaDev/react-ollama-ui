import React, { createContext, useContext, useState } from "react";

interface UIContextProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UIProviderProps {
  children: React.ReactNode;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: UIProviderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const value = {
    isSettingsOpen,
    setIsSettingsOpen,
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
