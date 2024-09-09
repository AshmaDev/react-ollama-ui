import { useState } from "react";
import { Sidebar, Sliders } from "@phosphor-icons/react";
import { useChat } from "@/contexts/ChatContext";
import { useUI } from "@/contexts/UIContext";
import Input from "../common/Input";

const ChatHeader = () => {
  const { setIsSidebarOpen, setIsSettingsOpen } = useUI();
  const { currentChat, setTitle, changeChatTitle } = useChat();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const saveTitle = async () => {
    setIsEditing(false);
    changeChatTitle();
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const openSettings = () => setIsSettingsOpen(true);

  return (
    <div className="flex items-center gap-4 p-4 border-b border-zinc-100">
      <button className="text-neutral-600 md:hidden" onClick={openSidebar}>
        <Sidebar size={24} />
      </button>

      <div className="flex-1 text-center md:text-left">
        {isEditing ? (
          <Input
            autoFocus
            value={currentChat.title}
            onChange={setTitle}
            onBlur={saveTitle}
            className="border border-zinc-300 p-2 rounded text-center md:text-left"
          />
        ) : (
          <span onClick={handleTitleClick}>{currentChat.title}</span>
        )}
      </div>

      <button className="text-neutral-600 md:hidden" onClick={openSettings}>
        <Sliders size={24} />
      </button>
    </div>
  );
};

export default ChatHeader;
