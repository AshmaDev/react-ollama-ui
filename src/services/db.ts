import { openDB } from "idb";
import { ChatMessage } from "../types/api.types";

const DB_NAME = "chatDB";
const STORE_NAME = "chats";
const DEFAULT_CHAT_TITLE = "New Chat";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveChat = async (
  chatId: string,
  messages: ChatMessage[],
  title: string = DEFAULT_CHAT_TITLE
) => {
  const db = await initDB();
  return db.put(STORE_NAME, { id: chatId, title, messages });
};

export const getChat = async (chatId: string) => {
  const db = await initDB();
  return db.get(STORE_NAME, chatId);
};

export const getAllChats = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const updateChatTitle = async (chatId: string, title: string) => {
  const db = await initDB();
  const chat = await db.get(STORE_NAME, chatId);

  if (chat) {
    chat.title = title;
    return db.put(STORE_NAME, chat);
  }

  throw new Error(`Chat with id ${chatId} not found`);
};
