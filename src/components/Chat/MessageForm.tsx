import { useState } from "react";
import { PaperPlane } from "@phosphor-icons/react";
import { useChat } from "../../contexts/ChatContext";
import { useSettings } from "../../contexts/SettingsContext";
import { ChatMessage, ChatRequest } from "../../types/api.types";
import { generateChat } from "../../services/api";

const MessageForm = () => {
  const { model } = useSettings();
  const { messages, setMessages } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const sendMessage = async (message: string) => {
    const userMessage: ChatMessage = { role: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const chatRequest: ChatRequest = {
      model,
      messages: [...messages, userMessage],
    };

    let botMessage: ChatMessage = { role: "bot", content: "" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    try {
      await generateChat(chatRequest, (data) => {
        botMessage.content += data.message.content;
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = { ...botMessage };
          return updatedMessages;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center border-t border-neutral-100 p-4 gap-3">
      <textarea
        className="flex-1 resize-none rounded-full py-2 px-4 border border-neutral-200 bg-neutral-50 outline-none focus:border-neutral-300"
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
  );
};

export default MessageForm;
