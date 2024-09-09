import useSWR from "swr";
import { useCallback } from "react";
import { getAllSettings, saveSettings } from "@/services/settings";
import { DEFAULT_API_URL } from "@/services/api";

export interface SettingsState {
  model?: string;
  apiUrl?: string;
  debugMode?: boolean;
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

export const useSettingsState = () => {
  const { data: settings, mutate } = useSWR<SettingsState>(
    "settings",
    fetchSettings,
    { revalidateOnFocus: false }
  );

  const updateSettings = useCallback(
    async (newSettings: Partial<SettingsState>) => {
      if (!settings) return;

      mutate(
        async (currentSettings) => {
          try {
            const updatedSettings = { ...currentSettings, ...newSettings };
            await saveSettings(updatedSettings);
            return updatedSettings;
          } catch (err) {
            console.error("Error saving settings", err);
            return currentSettings;
          }
        },
        {
          optimisticData: { ...settings, ...newSettings },
          rollbackOnError: true,
        }
      );
    },
    [settings, mutate]
  );

  return { settings: { ...DEFAULT_SETTINGS, ...settings }, updateSettings };
};
