import { Trash } from "@phosphor-icons/react";
import { useChat } from "@/contexts/ChatContext";
import { TChatListItem } from "@/types/api.types";

interface ChatListItemProps extends TChatListItem {
  onClick: (id: string) => void;
}

const ChatListItem = ({ id, title, onClick }: ChatListItemProps) => {
  const { deleteChatById } = useChat();

  const handleClick = () => {
    onClick(id);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteChatById(id);
  };

  return (
    <div
      className="group flex justify-between p-3 rounded-xl cursor-pointer transition-colors duration-200 bg-neutral-50 hover:bg-neutral-100"
      onClick={handleClick}
    >
      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>

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
