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
    <div className="px-4">
      <div className="flex flex-col items-center border rounded-xl p-4 border-neutral-200 bg-white">
        <h3 className="font-semibold text-center text-balance">
          Pulling {pullingState.model}...
        </h3>
        <p className="mb-2 text-sm">It may take a few minutes</p>

        <ProgressBar
          progress={
            (pullingState.status.completed / pullingState.status.total) * 100
          }
        />

        <div className="w-full flex justify-between text-xs mt-1 text-neutral-400">
          <span>{formatBytesToGB(pullingState.status.completed)}</span>
          <span>{formatBytesToGB(pullingState.status.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default PullingStatus;
