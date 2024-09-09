import ProgressBar from "@/components/common/ProgressBar";
import { useSettings } from "@/contexts/SettingsContext";

function formatBytesToGB(bytes: number) {
  return (bytes / 1024 ** 3).toFixed(2) + "GB";
}

const PullingStatus = () => {
  const { pullingState } = useSettings();

  if (!pullingState.model || pullingState.status.completed === 0) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col items-center border rounded-xl p-3 border-neutral-200 bg-white">
        <h3 className="font-semibold text-center text-balance text-sm">
          Pulling {pullingState.model}
        </h3>
        <p className="mb-2 text-xs">It may take a few minutes</p>

        <div className="relative w-full">
          <ProgressBar
            progress={
              (pullingState.status.completed / pullingState.status.total) * 100
            }
          />

          <div className="absolute top-0 w-full flex justify-center gap-1 text-xs text-neutral-600">
            <span>{formatBytesToGB(pullingState.status.completed)}</span> /
            <span>{formatBytesToGB(pullingState.status.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullingStatus;
