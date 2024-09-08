import { useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import Message from "./Message";

const MessageList = () => {
  const { currentChat } = useChat();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat.messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4 rounded-xl p-4">
        {currentChat.messages.map((message, index) => (
          <Message
            key={index}
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
