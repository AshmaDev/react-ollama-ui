import {
  TChatPartResponse,
  TChatRequest,
  TChatResponse,
  TListLocalModelsResponse,
  TPullModelRequest,
  TPullModelResponse,
} from "@/types/api.types";
import { getSettingByKey } from "./settings";
import { handleStream } from "@/utils/handleStream";

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

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const results: TChatResponse[] = [];

  await handleStream<TChatPartResponse>(response, (data) => {
    onDataReceived(data);
    results.push(data);
  });

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
  onDataReceived: (data: TPullModelResponse & { error?: string }) => void
): Promise<void> => {
  const apiUrl = await getApiUrl("/pull");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  await handleStream<TPullModelResponse & { error?: string }>(
    response,
    (data) => {
      onDataReceived(data);
    }
  );
};
