import React, { useEffect, useState } from "react";
import { ArrowLineRight } from "@phosphor-icons/react";
import { listLocalModels } from "../services/api";
import Select from "./common/Select";
import Input from "./common/Input";
import Toggle from "./common/Toggle";

interface SettingsSidebarProps {
  onClose: () => void;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  apiUrl: string;
  setApiUrl: React.Dispatch<React.SetStateAction<string>>;
  debugMode: boolean;
  setDebugMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  onClose,
  model,
  setModel,
  apiUrl,
  setApiUrl,
  debugMode,
  setDebugMode,
}) => {
  const [models, setModels] = useState<
    { name: string; modified_at: string; size: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await listLocalModels();
        setModels(response.models);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch models");
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="w-64 h-full p-4 bg-white border-l border-neutral-200">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-8">
        <h2 className="text-lg font-semibold">Settings</h2>

        <button className="text-neutral-600" onClick={onClose}>
          <ArrowLineRight size={24} />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Model</label>
        {loading ? (
          <p>Loading models...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Select
            value={model}
            options={models.map((m) => m.name)}
            onChange={(value) => setModel(value)}
            placeholder="Select a model"
            optionRenderer={(name) => name}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">API URL</label>
        <Input
          value={apiUrl}
          onChange={(value) => setApiUrl(value)}
          placeholder="Enter API URL"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Debug Mode</label>
        <Toggle
          initialValue={debugMode}
          onChange={() => setDebugMode((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default SettingsSidebar;
