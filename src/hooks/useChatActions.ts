import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";
import { deleteChat, saveChat, updateChatTitle } from "@/services/chat";
import { generateChat } from "@/services/api";
import {
  TChat,
  TChatListItem,
  TChatMessage,
  TChatRequest,
} from "@/types/api.types";

const useChatActions = (
  chatId: string | undefined,
  currentChat: TChat,
  updateChat: (updates: Partial<TChat>) => void,
  addToChatList: (newChat: TChatListItem) => void,
  deleteChatFromList: (id: string) => void
) => {
  const { model } = useSettings();
  const navigate = useNavigate();

  const changeChatTitle = async () => {
    if (chatId) {
      try {
        await updateChatTitle(chatId, currentChat.title);
        updateChat({ title: currentChat.title });
      } catch (error) {
        console.error("Error saving title:", error);
      }
    }
  };

  const deleteChatById = async (id: string) => {
    try {
      await deleteChat(id);
      deleteChatFromList(id);
      if (id === chatId) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const sendMessage = async (message: string) => {
    if (!model) return;
    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = uuidv4();
      addToChatList({ id: currentChatId, title: currentChat.title });
      navigate(`/chat/${currentChatId}`);
    }

    const userMessage: TChatMessage = { role: "user", content: message };
    const updatedMessages = [...currentChat.messages!, userMessage];
    updateChat({ messages: updatedMessages });

    const chatRequest: TChatRequest = {
      model,
      messages: updatedMessages,
    };

    let botMessage: TChatMessage = { role: "bot", content: "" };
    updateChat({ messages: [...updatedMessages, botMessage] });

    try {
      await generateChat(chatRequest, (data) => {
        botMessage.content += data.message.content;

        const updatedMessages = [...currentChat.messages!];
        updatedMessages[updatedMessages.length - 1] = { ...botMessage };
        updateChat({ messages: updatedMessages });
      });

      saveChat(currentChatId, currentChat.title, updatedMessages);
    } catch (error) {
      console.error("Error generating chat:", error);
    }
  };

  return {
    changeChatTitle,
    deleteChatById,
    sendMessage,
  };
};

export default useChatActions;
