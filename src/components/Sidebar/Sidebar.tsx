import { Plus, Sliders } from "@phosphor-icons/react";
import Button from "../common/Button";
import ChatList from "./ChatList";
import { useSettings } from "../../contexts/SettingsContext";

const Sidebar = () => {
  const { setIsSettingsOpen } = useSettings();

  const handleNewChat = () => {};

  const handleToggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  return (
    <div className="w-64 bg-white text-neutral-800 flex flex-col border-r border-gray-200">
      <div className="p-4">
        <div className="border-b border-neutral-100 pb-4">
          <Button
            block
            label="New Chat"
            className="border"
            onClick={handleNewChat}
            Icon={<Plus size={20} />}
          />
        </div>
      </div>

      <ChatList />

      <div className="p-4">
        <div className="border-t border-neutral-100 pt-2 space-y-2">
          <Button
            block
            label="Settings"
            onClick={handleToggleSettings}
            Icon={<Sliders size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
