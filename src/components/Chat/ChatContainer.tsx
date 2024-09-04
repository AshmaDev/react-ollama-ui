import { useChat } from "../../contexts/ChatContext";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import EmptyChat from "./EmptyChat";

const ChatContainer = () => {
  const { messages } = useChat();

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader />
      {messages.length > 0 ? <MessageList /> : <EmptyChat />}
      <MessageForm />
    </div>
  );
};

export default ChatContainer;
