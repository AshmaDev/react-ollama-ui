import { useChat } from "@/contexts/ChatContext";
import { useUI } from "@/contexts/UIContext";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import EmptyChat from "./EmptyChat";
import Alert from "../common/Alert";

const ChatContainer = () => {
  const { error, setError } = useUI();
  const { currentChat } = useChat();

  const closeError = () => {
    setError("");
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader />
      {currentChat.messages.length > 0 ? <MessageList /> : <EmptyChat />}
      {error && <Alert text={error} onClose={closeError} />}
      <MessageForm />
    </div>
  );
};

export default ChatContainer;
