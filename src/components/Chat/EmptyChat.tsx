import { useSettings } from "../../contexts/SettingsContext";
import ModelSelector from "../Settings/ModelSelector";

const EmptyChat = () => {
  const { model } = useSettings();

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div className="h-24 w-24 rounded-full border bg-[url(/favicon/icon.svg)] bg-cover" />
      <p>Hey! How can I help you today?</p>

      {!model && <ModelSelector />}
    </div>
  );
};

export default EmptyChat;
