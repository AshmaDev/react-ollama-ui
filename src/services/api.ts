import {
  ChatPartResponse,
  ChatRequest,
  ChatResponse,
  ListLocalModelsResponse,
} from "../types/api.types";
import { getSettingByKey } from "./settings";

export const DEFAULT_API_URL = "http://localhost:11434/api";

const getApiUrl = async (path: string): Promise<string> => {
  let apiUrl = DEFAULT_API_URL;

  try {
    const setting = await getSettingByKey("apiUrl");

    if (setting) {
      apiUrl = setting;
    }
  } catch (error) {
    console.warn(
      "Failed to retrieve API URL from settings, using default:",
      error
    );
  }

  return `${apiUrl}${path}`;
};

export const generateChat = async (
  request: ChatRequest,
  onDataReceived: (data: ChatPartResponse) => void
): Promise<ChatResponse[]> => {
  const apiUrl = await getApiUrl("/chat");

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = res.body?.getReader();
  let results: ChatResponse[] = [];
  let buffer = "";

  if (reader) {
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let boundary = buffer.lastIndexOf("\n");
      if (boundary !== -1) {
        const completeChunks = buffer.slice(0, boundary).split("\n");
        buffer = buffer.slice(boundary + 1);

        for (let chunk of completeChunks) {
          if (chunk.trim()) {
            try {
              const parsedChunk: ChatPartResponse = JSON.parse(chunk);
              onDataReceived(parsedChunk);
              results.push(parsedChunk);
            } catch (e) {
              console.error("Failed to parse chunk:", e, chunk);
            }
          }
        }
      }
    }

    if (buffer.trim()) {
      try {
        const parsedChunk: ChatPartResponse = JSON.parse(buffer);
        onDataReceived(parsedChunk);
        results.push(parsedChunk);
      } catch (e) {
        console.error("Failed to parse final buffer:", e, buffer);
      }
    }
  }

  return results;
};

export const listLocalModels = async (): Promise<ListLocalModelsResponse> => {
  const apiUrl = await getApiUrl("/tags");

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
