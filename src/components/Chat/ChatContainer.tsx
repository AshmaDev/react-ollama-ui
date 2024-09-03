import React, { useState } from "react";
import Message from "./Message";
import Button from "../common/Button";
import { PaperPlane } from "@phosphor-icons/react";

interface ChatContainerProps {
  messages: { role: string; content: string }[];
  onSendMessage: (message: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-4">
      <div className="mb-4">Chat 1</div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-xl bg-neutral-50">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.content}
            isUser={message.role === "user"}
          />
        ))}
      </div>

      <div className="flex items-center border-t border-neutral-100 pt-4 gap-2">
        <textarea
          className="flex-1 resize-none rounded-full py-2 px-4 border border-neutral-200 bg-neutral-50"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
        />

        <button type="button" className="text-neutral-600" onClick={handleSend}>
          <PaperPlane size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
