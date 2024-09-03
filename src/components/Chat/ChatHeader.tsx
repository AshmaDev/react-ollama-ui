interface ChatHeaderProps {
  title: string;
}

const ChatHeader = ({ title }: ChatHeaderProps) => {
  return <div className="p-4 border-b border-zinc-100">{title}</div>;
};

export default ChatHeader;
