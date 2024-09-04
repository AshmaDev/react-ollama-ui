import { useSettings } from "@/contexts/SettingsContext";
import ModelSelector from "../Settings/ModelSelector";
import Logo from "../common/Logo";

const EmptyChat = () => {
  const { model } = useSettings();

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <Logo size={24} />
      <p>Hey! How can I help you today?</p>

      {!model && <ModelSelector />}
    </div>
  );
};

export default EmptyChat;
