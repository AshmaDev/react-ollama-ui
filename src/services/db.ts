import { openDB } from "idb";

const DB_NAME = "reactOllamaDB";
const DB_VERSION = 1;

export const SETTINGS_STORE_NAME = "settings";
export const CHATS_STORE_NAME = "chats";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(SETTINGS_STORE_NAME)) {
        db.createObjectStore(SETTINGS_STORE_NAME);
      }

      if (!db.objectStoreNames.contains(CHATS_STORE_NAME)) {
        db.createObjectStore(CHATS_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};
