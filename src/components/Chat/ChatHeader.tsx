import { useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import Input from "../common/Input";

const ChatHeader = () => {
  const { currentChat, setTitle, changeChatTitle } = useChat();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const saveTitle = async () => {
    setIsEditing(false);
    changeChatTitle();
  };

  return (
    <div className="p-4 border-b border-zinc-100">
      {isEditing ? (
        <Input
          autoFocus
          value={currentChat.title}
          onChange={setTitle}
          onBlur={saveTitle}
          className="border border-zinc-300 p-2 rounded"
        />
      ) : (
        <span onClick={handleTitleClick}>{currentChat.title}</span>
      )}
    </div>
  );
};

export default ChatHeader;
