import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { getAllSettings, saveSettings } from "@/services/settings";
import { DEFAULT_API_URL } from "@/services/api";

interface SettingsContextProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  apiUrl: string;
  setApiUrl: React.Dispatch<React.SetStateAction<string>>;
  debugMode: boolean;
  setDebugMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const isFirstRender = useRef(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [model, setModel] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>(DEFAULT_API_URL);
  const [debugMode, setDebugMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getAllSettings();

      console.log(`Settings:`, settings);

      setModel(settings.model || "");
      setApiUrl(settings.apiUrl || DEFAULT_API_URL);
      setDebugMode(settings.debugMode || false);

      isFirstRender.current = false;
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    saveSettings({ model, apiUrl, debugMode });
  }, [model, apiUrl, debugMode]);

  const value = useMemo(
    () => ({
      isSettingsOpen,
      setIsSettingsOpen,
      model,
      setModel,
      apiUrl,
      setApiUrl,
      debugMode,
      setDebugMode,
    }),
    [
      isSettingsOpen,
      setIsSettingsOpen,
      model,
      setModel,
      apiUrl,
      setApiUrl,
      debugMode,
      setDebugMode,
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

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
