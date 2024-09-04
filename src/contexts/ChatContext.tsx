import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatMessage } from "../types/api.types";
import {
  getAllChats,
  getChat,
  updateChatTitle,
  deleteChat,
} from "../services/chat";

type ChatListItem = { id: string; title: string };

interface ChatContextProps {
  chatId?: string;
  title: string;
  messages: ChatMessage[];
  chatList: ChatListItem[];
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setChatList: React.Dispatch<React.SetStateAction<ChatListItem[]>>;
  addToChatList: (chatId: string) => void;
  changeChatTitle: () => void;
  deleteChatById: (chatId: string) => void;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

const DEFAULT_CHAT_TITLE = "New Chat";

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();

  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [title, setTitle] = useState<string>(DEFAULT_CHAT_TITLE);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const loadChat = async () => {
      if (chatId) {
        const chat = await getChat(chatId);

        if (chat) {
          setMessages(chat.messages);
          setTitle(chat.title);
        }
      } else {
        setMessages([]);
        setTitle(DEFAULT_CHAT_TITLE);
      }
    };

    loadChat();
  }, [chatId]);

  useEffect(() => {
    const fetchChats = async () => {
      const allChats = await getAllChats();

      setChatList(allChats.map((chat) => ({ id: chat.id, title: chat.title })));
    };

    fetchChats();
  }, []);

  const addToChatList = async (id: string) => {
    setChatList((prev) => [...prev, { id, title }]);
  };

  const changeChatTitle = async () => {
    if (chatId) {
      try {
        await updateChatTitle(chatId, title);
      } catch (error) {
        console.error("Error saving title:", error);
      }

      setChatList((prevChatList) =>
        prevChatList.map((chat) =>
          chat.id === chatId ? { ...chat, title } : chat
        )
      );
    }
  };

  const deleteChatById = async (id: string) => {
    try {
      await deleteChat(id);
      setChatList((prevList) => prevList.filter((chat) => chat.id !== id));

      if (id === chatId) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const value = useMemo(
    () => ({
      chatId,
      title,
      messages,
      chatList,
      setTitle,
      setMessages,
      setChatList,
      addToChatList,
      changeChatTitle,
      deleteChatById,
    }),
    [
      chatId,
      title,
      messages,
      chatList,
      setTitle,
      setMessages,
      setChatList,
      addToChatList,
      changeChatTitle,
      deleteChatById,
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
