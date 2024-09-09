import Button from "@/components/common/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { modelList } from "@/data/modelList";

interface ModelListProps {
  onPull: (modelName: string) => void;
}

const ModelList = ({ onPull }: ModelListProps) => {
  const { modelList: localModelList } = useSettings();

  return (
    <>
      <h3 className="font-semibold text-neutral-700 mb-3">Popular Models</h3>

      <div className="max-h-96 overflow-auto px-4">
        {modelList.map((model) => {
          const isPulled = !!localModelList?.find(
            (m) => m.name.split(":")[0] === model.name
          );

          return (
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
                  label={isPulled ? "Pulled" : "Pull"}
                  disabled={isPulled}
                  className="border border-neutral-200"
                  onClick={() => onPull(model.name)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ModelList;
