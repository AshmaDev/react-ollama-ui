import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

interface ChatContainerProps {
  messages: { role: string; content: string }[];
  onSendMessage: (message: string) => void;
}

const ChatContainer = ({ messages, onSendMessage }: ChatContainerProps) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader title="Chat 1" />
      <MessageList messages={messages} />
      <MessageForm onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatContainer;
