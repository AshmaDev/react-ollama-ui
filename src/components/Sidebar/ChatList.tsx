import { useNavigate } from "react-router-dom";
import { useChat } from "../../contexts/ChatContext";

const ChatList = () => {
  const navigate = useNavigate();
  const { chatList } = useChat();

  const handleChatClick = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-2">
      {chatList.map((chat) => (
        <div
          key={`chat-${chat.id}`}
          className="p-3 rounded-xl cursor-pointer bg-neutral-50 hover:bg-neutral-100"
          onClick={() => handleChatClick(chat.id)}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
