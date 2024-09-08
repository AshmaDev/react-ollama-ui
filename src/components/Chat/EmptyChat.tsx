import { useSettings } from "@/contexts/SettingsContext";
import ModelSelector from "../Settings/ModelSelector";
import Logo from "../common/Logo";

const EmptyChat = () => {
  const { model } = useSettings();

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 items-center max-w-sm">
        <Logo size="lg" />
        <p>Hey! How can I help you today?</p>

        {!model && <ModelSelector />}
      </div>
    </div>
  );
};

export default EmptyChat;
