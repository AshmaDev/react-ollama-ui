import useSWR from "swr";
import { useState, useEffect } from "react";
import { TChat } from "@/types/api.types";
import { getChat } from "@/services/chat";

const DEFAULT_CHAT_STATE = {
  id: "",
  title: "New Chat",
  messages: [],
};

const fetchChat = async (chatId: string) => {
  return await getChat(chatId);
};

const useCurrentChat = (chatId: string | undefined) => {
  const { data: chatData } = useSWR<TChat | null>(
    chatId ? `chat/${chatId}` : null,
    () => (chatId ? fetchChat(chatId) : Promise.resolve(null))
  );

  const [currentChat, setCurrentChat] = useState<TChat>(DEFAULT_CHAT_STATE);

  useEffect(() => {
    if (chatId) {
      setCurrentChat((prevChat) => ({
        ...prevChat,
        ...chatData,
      }));
    } else {
      setCurrentChat(DEFAULT_CHAT_STATE);
    }
  }, [chatId, chatData]);

  return {
    currentChat,
    setCurrentChat,
  };
};

export default useCurrentChat;
