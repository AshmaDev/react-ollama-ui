const baseUrl = "http://localhost:11434/api"; // Replace with your actual base URL

export type ChatRequest = {
  model: string;
  messages?: ChatMessage[];
};

export type ChatMessage = {
  role: string;
  content: string;
};

export type ChatCompletedResponse = {
  model: string;
  created_at: string;
  message: ChatMessage;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

export type ChatPartResponse = {
  model: string;
  created_at: string;
  message: ChatMessage;
  done: boolean;
};

export type ChatResponse = ChatCompletedResponse | ChatPartResponse;

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
