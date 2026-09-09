export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export interface InterviewConfig {
  topic: string;
  experience: string;
  duration: number;
}