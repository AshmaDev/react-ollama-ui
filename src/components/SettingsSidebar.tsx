import React from "react";

interface SettingsSidebarProps {
  onClose: () => void;
  model: string;
  setModel: (model: string) => void;
  apiUrl: string;
  setApiUrl: (url: string) => void;
  debugMode: boolean;
  setDebugMode: (mode: boolean) => void;
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
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4 right-0 h-full shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          Close
        </button>
      </div>

      {/* Model Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
      </div>

      {/* API URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">API URL</label>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
      </div>

      {/* Debug Mode Toggle */}
      <div className="mb-4 flex items-center">
        <label className="block text-sm font-medium mr-2">Debug Mode</label>
        <input
          type="checkbox"
          checked={debugMode}
          onChange={() => setDebugMode(!debugMode)}
          className="w-4 h-4 bg-gray-800 text-blue-600 border-gray-600 rounded"
        />
      </div>
    </div>
  );
};

export default SettingsSidebar;
