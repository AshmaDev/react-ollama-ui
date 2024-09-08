import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  TChat,
  TChatList,
  TChatMessage,
  TChatRequest,
} from "@/types/api.types";
import useChatList from "@/hooks/useChatList";
import useCurrentChat from "@/hooks/useCurrentChat";
import { deleteChat, saveChat, updateChatTitle } from "@/services/chat";
import { generateChat } from "@/services/api";
import { useSettings } from "./SettingsContext";

interface ChatContextProps {
  currentChat: TChat;
  chatList: TChatList;
  setTitle: (title: string) => void;
  changeChatTitle: () => Promise<void>;
  deleteChatById: (chatId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { model } = useSettings();
  const navigate = useNavigate();

  const { chatList, addToChatList, updateChatListTitle, deleteChatFromList } =
    useChatList();
  const { currentChat, setCurrentChat } = useCurrentChat(chatId);

  const changeChatTitle = useCallback(async () => {
    if (!chatId) return;

    try {
      await updateChatTitle(chatId, currentChat.title);
      updateChatListTitle(chatId, currentChat.title);
    } catch (error) {
      console.error("Error updating chat title:", error);
    }
  }, [chatId, currentChat.title, updateChatListTitle]);

  const deleteChatById = useCallback(
    async (id: string) => {
      try {
        await deleteChat(id);
        deleteChatFromList(id);

        if (id === chatId) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    },
    [chatId, deleteChatFromList, navigate]
  );

  const createNewChat = useCallback((): string => {
    const id = uuidv4();
    addToChatList({ id, title: currentChat.title });
    navigate(`/chat/${id}`);

    return id;
  }, [addToChatList, currentChat.title, navigate]);

  const sendMessage = async (message: string) => {
    if (!model) return;
    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = createNewChat();
    }

    const userMessage: TChatMessage = { role: "user", content: message };
    const updatedMessages = [...currentChat.messages!, userMessage];
    setCurrentChat((prevChat) => ({
      ...prevChat,
      messages: updatedMessages,
    }));

    const chatRequest: TChatRequest = {
      model,
      messages: updatedMessages,
    };

    let botMessage: TChatMessage = { role: "bot", content: "" };
    setCurrentChat((prevChat) => ({
      ...prevChat,
      messages: [...updatedMessages, botMessage],
    }));

    try {
      await generateChat(chatRequest, (data) => {
        botMessage.content += data.message.content;
        setCurrentChat((prevChat) => {
          const updatedMessages = [...prevChat.messages!];
          updatedMessages[updatedMessages.length - 1] = { ...botMessage };
          return { ...prevChat, messages: updatedMessages };
        });
      });

      saveChat(currentChatId, currentChat.title, [
        ...currentChat.messages,
        userMessage,
        botMessage,
      ]);
    } catch (error) {
      console.error("Error generating chat:", error);
    }
  };

  const value = useMemo(
    () => ({
      chatList,
      currentChat,
      setTitle: (title: string) =>
        setCurrentChat((prev) => ({ ...prev, title })),
      changeChatTitle,
      deleteChatById,
      sendMessage,
    }),
    [
      chatList,
      currentChat,
      changeChatTitle,
      deleteChatById,
      sendMessage,
      setCurrentChat,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
