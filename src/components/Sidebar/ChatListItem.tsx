import { Trash } from "@phosphor-icons/react";
import { useChat } from "../../contexts/ChatContext";

interface ChatListItemProps {
  id: string;
  title: string;
  onClick: (id: string) => void;
}

const ChatListItem = ({ id, title, onClick }: ChatListItemProps) => {
  const { deleteChatById } = useChat();

  const handleClick = () => {
    onClick(id);
  };

  const handleDelete = () => {
    deleteChatById(id);
  };

  return (
    <div
      className="group flex justify-between p-3 rounded-xl cursor-pointer transition-colors duration-200  bg-neutral-50 hover:bg-neutral-100"
      onClick={handleClick}
    >
      {title}

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-600"
        aria-label="Delete chat"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default ChatListItem;
