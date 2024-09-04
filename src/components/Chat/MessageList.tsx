import { useEffect, useRef } from "react";
import Message from "./Message";
import { useChat } from "../../contexts/ChatContext";

const MessageList = () => {
  const { messages } = useChat();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4 rounded-xl p-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            text={message.content}
            isUser={message.role === "user"}
          />
        ))}

        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
