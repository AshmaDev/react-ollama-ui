import useSWR from "swr";
import { useState, useEffect } from "react";
import { TChatList, TChatListItem } from "@/types/api.types";
import { getAllChats } from "@/services/chat";

const fetchChats = async () => {
  const chats = await getAllChats();
  return chats.map((chat) => ({ id: chat.id, title: chat.title }));
};

const useChatList = () => {
  const { data: initialChatList, isLoading: isChatListLoading } =
    useSWR<TChatList>("chats", fetchChats);
  const [chatList, setChatList] = useState<TChatList>([]);

  useEffect(() => {
    if (!isChatListLoading) {
      setChatList(initialChatList ?? []);
    }
  }, [isChatListLoading, initialChatList]);

  const addToChatList = (newChat: TChatListItem) => {
    setChatList((prevChatList) => [...prevChatList, newChat]);
  };

  const updateChatListTitle = (chatId: string, title: string) => {
    setChatList((prevChatList) =>
      prevChatList.map((chat) =>
        chat.id === chatId ? { ...chat, title } : chat
      )
    );
  };

  const deleteChatFromList = (id: string) => {
    setChatList((prevChatList) =>
      prevChatList.filter((chat) => chat.id !== id)
    );
  };

  return {
    chatList,
    addToChatList,
    updateChatListTitle,
    deleteChatFromList,
  };
};

export default useChatList;
