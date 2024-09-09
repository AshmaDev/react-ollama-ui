import { useSettings } from "@/contexts/SettingsContext";
import { useUI } from "@/contexts/UIContext";
import Popup from "@/components/common/Popup";
import Alert from "@/components/common/Alert";
import ModelList from "./ModelList";
import PullForm from "./PullForm";

const PullModel = () => {
  const { pullingState, pullModel, clearPullingState } = useSettings();
  const { isPullPopupOpen, setIsPullPopupOpen } = useUI();

  return (
    <Popup isOpen={isPullPopupOpen} onClose={() => setIsPullPopupOpen(false)}>
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        Pull Model
      </h3>
      <PullForm onPull={pullModel} />
      {pullingState.error && (
        <Alert text={pullingState.error} onClose={clearPullingState} />
      )}
      <ModelList onPull={pullModel} />
    </Popup>
  );
};

export default PullModel;
