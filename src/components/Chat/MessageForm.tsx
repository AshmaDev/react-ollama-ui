import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaperPlane } from "@phosphor-icons/react";
import { useChat } from "../../contexts/ChatContext";
import { useSettings } from "../../contexts/SettingsContext";
import { ChatMessage, ChatRequest } from "../../types/api.types";
import { generateChat } from "../../services/api";
import { saveChat } from "../../services/chat";

const MessageForm = () => {
  const { model } = useSettings();
  const { chatId, title, messages, setMessages, addToChatList } = useChat();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const sendMessage = async (message: string) => {
    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = uuidv4();
      addToChatList(currentChatId);
      navigate(`/chat/${currentChatId}`);
    }

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

      saveChat(currentChatId, title, [...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error generating chat:", error);
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
        disabled={!model}
      />

      <button
        type="button"
        className="text-neutral-600"
        onClick={handleSend}
        disabled={!model}
      >
        <PaperPlane size={24} />
      </button>
    </div>
  );
};

export default MessageForm;
