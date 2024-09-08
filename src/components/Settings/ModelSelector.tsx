import useSWR from "swr";
import { useSettings } from "@/contexts/SettingsContext";
import { listLocalModels } from "@/services/api";
import Select from "../common/Select";

const fetcher = async () => {
  const response = await listLocalModels();
  return response.models;
};

const ModelSelector = () => {
  const { model, setModel } = useSettings();

  const { data: models, error } = useSWR("localModels", fetcher);

  if (error) {
    return <p className="text-red-500">Failed to fetch models</p>;
  }

  if (!models) {
    return <p>Loading models...</p>;
  }

  return (
    <Select
      value={model}
      options={models.map((m) => m.name)}
      onChange={(value) => setModel(value)}
      placeholder="Select a model"
      optionRenderer={(name) => name}
    />
  );
};

export default ModelSelector;
