import { useSettings } from "@/contexts/SettingsContext";
import Select from "../common/Select";

const ModelSelector = () => {
  const { model, modelList, modelListError, setModel } = useSettings();

  if (modelListError) {
    return <p className="text-red-500">Failed to fetch models</p>;
  }

  if (!modelList) {
    return <p>Loading models...</p>;
  }

  return (
    <Select
      value={model}
      options={modelList.map((m) => m.name)}
      onChange={(value) => setModel(value)}
      placeholder="Select a model"
      optionRenderer={(name) => name}
    />
  );
};

export default ModelSelector;
