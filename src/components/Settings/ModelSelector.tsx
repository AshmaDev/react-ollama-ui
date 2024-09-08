import useSWR from "swr";
import { useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { listLocalModels } from "@/services/api";
import Select from "../common/Select";
import { useUI } from "@/contexts/UIContext";

const fetcher = async () => {
  const response = await listLocalModels();
  return response.models;
};

const ModelSelector = () => {
  const { model, setModel } = useSettings();
  const { setIsPullPopupOpen } = useUI();

  const { data: models, error } = useSWR("localModels", fetcher);

  useEffect(() => {
    if (models?.length === 0) {
      setIsPullPopupOpen(true);
    }
  }, [models, setIsPullPopupOpen]);

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
