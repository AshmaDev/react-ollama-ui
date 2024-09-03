import {
  ChatPartResponse,
  ChatRequest,
  ChatResponse,
  ListLocalModelsResponse,
} from "../types/api.types";

const baseUrl = "http://localhost:11434/api";

const getApiUrl = (path: string) => `${baseUrl}${path}`;

export const generateChat = async (
  request: ChatRequest,
  onDataReceived: (data: ChatPartResponse) => void
): Promise<ChatResponse[]> => {
  const res = await fetch(getApiUrl("/chat"), {
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

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const parsedChunk: ChatPartResponse = JSON.parse(chunk);

      onDataReceived(parsedChunk);
      results.push(parsedChunk);
    }
  }

  return results;
};

export const listLocalModels = async (): Promise<ListLocalModelsResponse> => {
  const response = await fetch(getApiUrl("/tags"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
