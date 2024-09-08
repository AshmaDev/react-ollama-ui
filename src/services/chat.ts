import { TChatMessage } from "@/types/api.types";
import { CHATS_STORE_NAME, initDB } from "./db";

export const saveChat = async (
  chatId: string,
  title: string,
  messages: TChatMessage[]
) => {
  const db = await initDB();

  return db.put(CHATS_STORE_NAME, { id: chatId, title, messages });
};

export const getChat = async (chatId: string) => {
  const db = await initDB();

  return db.get(CHATS_STORE_NAME, chatId);
};

export const getAllChats = async () => {
  const db = await initDB();

  return db.getAll(CHATS_STORE_NAME);
};

export const updateChatTitle = async (chatId: string, title: string) => {
  const db = await initDB();
  const chat = await db.get(CHATS_STORE_NAME, chatId);

  if (chat) {
    chat.title = title;
    return db.put(CHATS_STORE_NAME, chat);
  }

  throw new Error(`Chat with id ${chatId} not found`);
};

export const deleteChat = async (chatId: string) => {
  const db = await initDB();

  return db.delete(CHATS_STORE_NAME, chatId);
};
