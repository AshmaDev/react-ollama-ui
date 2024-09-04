import { useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { listLocalModels } from "@/services/api";
import Select from "../common/Select";

const ModelSelector = () => {
  const { model, setModel } = useSettings();

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
    <div>
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
  );
};

export default ModelSelector;
