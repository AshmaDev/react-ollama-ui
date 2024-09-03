import React, { useState } from "react";
import Message from "./Message";

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
    <div className="flex-1 flex flex-col bg-gray-100 p-4">
      {/* Messages Box */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.content}
            isUser={message.role === "user"}
          />
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center border-t border-gray-300 pt-2">
        <textarea
          className="flex-1 resize-none border rounded-lg p-2 mr-2"
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
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
