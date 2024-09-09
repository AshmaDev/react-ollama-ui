import { ArrowLineRight } from "@phosphor-icons/react";
import { useSettings } from "@/contexts/SettingsContext";
import { useUI } from "@/contexts/UIContext";
import Input from "../common/Input";
import Toggle from "../common/Toggle";
import ModelSelector from "./ModelSelector";
import Button from "../common/Button";

const SettingsSidebar = () => {
  const { setIsSettingsOpen, setIsPullPopupOpen } = useUI();
  const { apiUrl, debugMode, pullingState, setApiUrl, setDebugMode } =
    useSettings();

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="w-64 h-full p-4 bg-white border-l border-neutral-200">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-4">
        <h2 className="text-lg font-semibold">Settings</h2>

        <button className="text-neutral-600" onClick={handleClose}>
          <ArrowLineRight size={24} />
        </button>
      </div>

      <div className="mb-4">
        <p className="block text-sm font-medium mb-2">Select Model</p>

        <ModelSelector />
      </div>

      <div className="mb-4">
        <p className="block text-sm font-medium mb-2">Add New Model</p>

        <Button
          block
          label={
            pullingState.model
              ? `Pulling in progress...`
              : "Pull Model"
          }
          disabled={!!pullingState.model}
          className="border border-neutral-200 justify-center"
          onClick={() => setIsPullPopupOpen(true)}
        />
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
          onChange={() => setDebugMode(!debugMode)}
        />
      </div>
    </div>
  );
};

export default SettingsSidebar;
