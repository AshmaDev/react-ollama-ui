import { SETTINGS_STORE_NAME, initDB } from "./db";

export const saveSettings = async (settings: {
  model?: string;
  apiUrl?: string;
  debugMode?: boolean;
}) => {
  const db = await initDB();

  for (const [key, value] of Object.entries(settings)) {
    if (value !== undefined) {
      await db.put(SETTINGS_STORE_NAME, value, key);
    }
  }
};

export const getAllSettings = async (): Promise<
  Partial<{ model: string; apiUrl: string; debugMode: boolean }>
> => {
  const db = await initDB();

  const allKeys = await db.getAllKeys(SETTINGS_STORE_NAME);
  const settings: Record<string, any> = {};

  for (const key of allKeys) {
    settings[key as string] = await db.get(SETTINGS_STORE_NAME, key);
  }

  return settings;
};

export const getSettingByKey = async (key: string): Promise<any> => {
  const db = await initDB();
  return db.get(SETTINGS_STORE_NAME, key);
};
