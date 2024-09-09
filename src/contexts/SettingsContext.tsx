import React, { createContext, useCallback, useContext, useMemo } from "react";
import { SettingsState, useSettingsState } from "@/hooks/useSettingsState";
import { PullingState, usePullingState } from "@/hooks/usePullingState";
import { useModelList } from "@/hooks/useModelList";
import { TModel } from "@/types/api.types";
import { useUI } from "./UIContext";

interface SettingsContextProps extends SettingsState {
  pullingState: PullingState;
  modelList?: TModel[];
  modelListError: string;
  setModel: (model: string) => void;
  setApiUrl: (apiUrl: string) => void;
  setDebugMode: (debugMode: boolean) => void;
  pullModel: (model: string) => void;
  clearPullingState: () => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { setIsPullPopupOpen } = useUI();
  const { settings, updateSettings } = useSettingsState();
  const { modelList, modelListError, refetchModelList } = useModelList();
  const { pullingState, pullNewModel, clearPullingState } = usePullingState(
    setIsPullPopupOpen,
    settings?.debugMode ?? false,
    refetchModelList
  );

  const setModel = useCallback(
    (model: string) => updateSettings({ model }),
    [updateSettings]
  );

  const setApiUrl = useCallback(
    (apiUrl: string) => updateSettings({ apiUrl }),
    [updateSettings]
  );

  const setDebugMode = useCallback(
    (debugMode: boolean) => updateSettings({ debugMode }),
    [updateSettings]
  );

  const value = useMemo(
    () => ({
      ...settings,
      modelList,
      modelListError,
      pullingState,
      setModel,
      setApiUrl,
      setDebugMode,
      pullModel: pullNewModel,
      clearPullingState,
    }),
    [
      settings,
      modelList,
      modelListError,
      pullingState,
      setModel,
      setApiUrl,
      setDebugMode,
      pullNewModel,
      clearPullingState,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");

  return context;
};
