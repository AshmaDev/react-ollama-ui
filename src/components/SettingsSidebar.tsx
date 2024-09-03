import React, { useEffect, useState } from "react";
import { listLocalModels } from "../services/api";

interface SettingsSidebarProps {
  onClose: () => void;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  apiUrl: string;
  setApiUrl: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  onClose,
  model,
  setModel,
  apiUrl,
  setApiUrl,
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
    <div className="w-64 h-full p-4 border-l border-gray-200 bg-white">
      <button
        className="absolute top-4 right-4 text-gray-600"
        onClick={onClose}
      >
        &times;
      </button>

      <h2 className="text-lg font-semibold mb-8 border-b border-gray-200 pb-4">
        Settings
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Model</label>
        {loading ? (
          <p>Loading models...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <select
            className="w-full border rounded-lg p-2"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">Select a model</option>
            {models.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">API URL</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SettingsSidebar;
