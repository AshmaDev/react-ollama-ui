import {
  TChatPartResponse,
  TChatRequest,
  TChatResponse,
  TListLocalModelsResponse,
  TPullModelRequest,
  TPullModelResponse,
} from "@/types/api.types";
import { getSettingByKey } from "./settings";

export const DEFAULT_API_URL = "http://localhost:11434/api";

const getApiUrl = async (path: string): Promise<string> => {
  let apiUrl = DEFAULT_API_URL;

  const setting = await getSettingByKey("apiUrl");

  if (setting) {
    apiUrl = setting;
  }

  return `${apiUrl}${path}`;
};

export const generateChat = async (
  request: TChatRequest,
  onDataReceived: (data: TChatPartResponse) => void
): Promise<TChatResponse[]> => {
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
  const results: TChatResponse[] = [];
  let buffer = "";

  if (reader) {
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const boundary = buffer.lastIndexOf("\n");
      if (boundary !== -1) {
        const completeChunks = buffer.slice(0, boundary).split("\n");
        buffer = buffer.slice(boundary + 1);

        for (const chunk of completeChunks) {
          if (chunk.trim()) {
            const parsedChunk: TChatPartResponse = JSON.parse(chunk);
            onDataReceived(parsedChunk);
            results.push(parsedChunk);
          }
        }
      }
    }

    if (buffer.trim()) {
      const parsedChunk: TChatPartResponse = JSON.parse(buffer);
      onDataReceived(parsedChunk);
      results.push(parsedChunk);
    }
  }

  return results;
};

export const listLocalModels = async (): Promise<TListLocalModelsResponse> => {
  const apiUrl = await getApiUrl("/tags");

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const pullModel = async (
  request: TPullModelRequest,
  onDataReceived: (data: TPullModelResponse) => void
): Promise<{ error?: string }> => {
  const apiUrl = await getApiUrl("/pull");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");
  let done = false;
  let result;

  while (!done) {
    const { value, done: doneReading } = (await reader?.read()) ?? {};
    done = !!doneReading;

    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      onDataReceived(JSON.parse(chunk));
      result = JSON.parse(chunk);
    }
  }

  return result;
};
