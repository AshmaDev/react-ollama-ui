import { useNavigate } from "react-router-dom";
import { useChat } from "@/contexts/ChatContext";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const navigate = useNavigate();
  const { chatList } = useChat();

  const handleChatClick = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-2">
      {chatList.map((chat) => (
        <ChatListItem
          key={`chat-${chat.id}`}
          id={chat.id}
          title={chat.title}
          onClick={handleChatClick}
        />
      ))}
    </div>
  );
};

export default ChatList;
