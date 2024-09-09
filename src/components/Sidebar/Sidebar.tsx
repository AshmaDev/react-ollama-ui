import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { ArrowLineLeft, Plus, Sliders } from "@phosphor-icons/react";
import { useUI } from "@/contexts/UIContext";
import PullingStatus from "../Settings/PullModel/PullingStatus";
import Button from "../common/Button";
import ChatList from "./ChatList";

const Sidebar = () => {
  const { isSidebarOpen, setIsSettingsOpen, setIsSidebarOpen } = useUI();
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  const handleToggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed md:relative z-10 left-0 w-64 h-screen flex flex-col border-r border-neutral-200 bg-white text-neutral-800 ",
        { "hidden md:flex": !isSidebarOpen }
      )}
    >
      <div className="p-4">
        <button className="text-neutral-600 mb-4 md:hidden" onClick={handleClose}>
          <ArrowLineLeft size={24} />
        </button>

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

      <div className="px-4 mb-4 hidden md:block">
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
