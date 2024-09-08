export type TChat = {
  id: string;
  title: string;
  messages: TChatMessage[];
};

export type TChatListItem = Omit<TChat, "messages">;
export type TChatList = TChatListItem[];

export type TChatRequest = {
  model: string;
  messages?: TChatMessage[];
};

export type TChatMessage = {
  role: string;
  content: string;
  type?: string;
};

export type TChatCompletedResponse = {
  model: string;
  created_at: string;
  message: TChatMessage;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

export type TChatPartResponse = {
  model: string;
  created_at: string;
  message: TChatMessage;
  done: boolean;
};

export type TModel = {
  name: string;
  modified_at: string;
  size: number;
};

export type TListLocalModelsResponse = {
  models: TModel[];
};

export type TChatResponse = TChatCompletedResponse | TChatPartResponse;
