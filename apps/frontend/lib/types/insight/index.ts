export enum ChatMessageRole {
  ASSISTANT = "assistant",
  USER = "user",
}

export type Reflection = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  sessionId: string;
  createdAt: Date;
};

export type ReflectionWithMessages = Reflection & {
  messages: ChatMessage[];
};

export type ReflectionPreview = {
  id: string;
  previewText: string;
  createdAt: Date;
};

export type ReflectionPrompt = {
  content: string;
};
