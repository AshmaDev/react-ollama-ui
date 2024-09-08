import { useState } from "react";
import { SpinnerGap } from "@phosphor-icons/react";
import { useSettings } from "@/contexts/SettingsContext";
import { useUI } from "@/contexts/UIContext";
import { modelList } from "@/data/modelList";
import { pullModel } from "@/services/api";
import Button from "../common/Button";
import Input from "../common/Input";
import Popup from "../common/Popup";

const PullModel = () => {
  const { debugMode } = useSettings();
  const { isPullPopupOpen, setIsPullPopupOpen } = useUI();
  const [inputValue, setInputValue] = useState<string>("");
  const [loadingModel, setLoadingModel] = useState<string>("");

  const handlePull = async (modelName: string) => {
    setLoadingModel(modelName);

    try {
      const response = await pullModel({ name: modelName });
      console.log(response.error);
    } catch (error) {
      if (debugMode) {
        console.log("Error pulling model", error);
      }
    } finally {
      setLoadingModel("");
    }
  };

  if (loadingModel) {
    return (
      <Popup isOpen={isPullPopupOpen} onClose={() => setIsPullPopupOpen(false)}>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold">Pulling {loadingModel}...</h3>

          <p className="mb-4">It may take a few minutes</p>

          <div>
            <span className="inline-block animate-spin">
              <SpinnerGap size={32} />
            </span>
          </div>
        </div>
      </Popup>
    );
  }

  return (
    <Popup isOpen={isPullPopupOpen} onClose={() => setIsPullPopupOpen(false)}>
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        Pull Model
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Model"
          value={inputValue}
          onChange={setInputValue}
        />
        <Button
          label="Pull"
          className="border border-neutral-200"
          onClick={() => handlePull(inputValue)}
        />
      </div>

      <h3 className="font-semibold text-neutral-700 mb-3">Popular Models</h3>

      <div className="max-h-96 overflow-auto px-4">
        {modelList.map((model) => (
          <div
            key={`model-${model.id}`}
            className="flex items-center gap-4 border-b border-neutral-200 pb-4 mb-4"
          >
            <div className="w-20 shrink-0 font-semibold text-neutral-600 text-wrap">
              {model.name}
            </div>

            <div className="text-left">{model.description}</div>

            <div>
              <Button
                label={loadingModel === model.name ? "Pulling..." : "Pull"}
                className="border border-neutral-200"
                disabled={loadingModel === model.name}
                onClick={() => handlePull(model.name)}
              />
            </div>
          </div>
        ))}
      </div>
    </Popup>
  );
};

export default PullModel;
