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

export type Model = {
  name: string;
  modified_at: string;
  size: number;
};

export type ListLocalModelsResponse = {
  models: Model[];
};

export type ChatResponse = ChatCompletedResponse | ChatPartResponse;
