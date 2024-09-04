import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader />
      <MessageList />
      <MessageForm />
    </div>
  );
};

export default ChatContainer;
