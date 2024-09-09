import { useNavigate } from "react-router-dom";
import { Plus, Sliders } from "@phosphor-icons/react";
import { useUI } from "@/contexts/UIContext";
import Button from "../common/Button";
import ChatList from "./ChatList";
import PullingStatus from "../Settings/PullModel/PullingStatus";

const Sidebar = () => {
  const { setIsSettingsOpen } = useUI();
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  const handleToggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  return (
    <div className="w-64 bg-white text-neutral-800 flex flex-col border-r border-neutral-200">
      <div className="p-4">
        <div className="border-b border-neutral-100 pb-4">
          <Button
            block
            label="New Chat"
            className="border border-neutral-200"
            onClick={handleNewChat}
            Icon={<Plus size={20} />}
          />
        </div>
      </div>

      <ChatList />
      
      <PullingStatus />

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
