import useSWR from "swr";
import React, { createContext, useContext, useMemo, useCallback } from "react";
import { getAllSettings, saveSettings } from "@/services/settings";
import { DEFAULT_API_URL } from "@/services/api";

interface SettingsState {
  model?: string;
  apiUrl?: string;
  debugMode?: boolean;
}

interface SettingsContextProps extends SettingsState {
  setModel: (model: string) => void;
  setApiUrl: (apiUrl: string) => void;
  setDebugMode: (debugMode: boolean) => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const DEFAULT_SETTINGS = {
  model: "",
  apiUrl: DEFAULT_API_URL,
  debugMode: false,
};

const fetchSettings = async () => {
  const settings = await getAllSettings();

  return settings;
};

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { data: settings, mutate } = useSWR<SettingsState>(
    "settings",
    fetchSettings,
    { revalidateOnFocus: false }
  );

  const updateSettings = useCallback(
    (newSettings: Partial<SettingsState>) => {
      if (!settings) return;

      mutate(
        async (currentSettings) => {
          const updatedSettings = { ...currentSettings, ...newSettings };
          await saveSettings(updatedSettings);
          return updatedSettings;
        },
        {
          optimisticData: { ...settings, ...newSettings },
          rollbackOnError: true,
        }
      );
    },
    [settings, mutate]
  );

  const value = useMemo(() => {
    return {
      ...DEFAULT_SETTINGS,
      ...settings,
      setModel: (model: string) => updateSettings({ model }),
      setApiUrl: (apiUrl: string) => updateSettings({ apiUrl }),
      setDebugMode: (debugMode: boolean) => updateSettings({ debugMode }),
    };
  }, [settings, updateSettings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
