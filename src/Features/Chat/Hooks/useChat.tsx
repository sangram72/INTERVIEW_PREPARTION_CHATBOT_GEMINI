import { useState } from 'react';
import type{
  ChatMessage,
  InterviewConfig,
} from '../types';
import { GET_CHAT } from "../Services/ChatApiservice";

const useChat = () => {
  const [config, setConfig] =
    useState<InterviewConfig | null>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const startInterview = async (
    config: InterviewConfig
  ) => {
    setConfig(config);
    setMessages([]);
    setError(null);
    setIsLoading(true);

    try {
      const response = await GET_CHAT(
        `You are an interview preparation assistant.

The user is preparing for a ${config.topic} interview.

Experience level: ${config.experience}.

Available preparation time: ${config.duration} minutes.

Create a useful interview preparation question set for the user.

Include:
- Basic questions
- Technical questions
- Practical questions
- Scenario-based questions
- Important questions for the selected experience level

Organize the questions clearly.

Do not provide answers unless the user asks for them.

Keep the content focused on interview preparation for the selected topic.`
      );

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response??"",
      };

      setMessages([aiMessage]);
    } catch (error) {
      console.error(
        'Failed to start interview:',
        error
      );

      setError(
        'Unable to start preparation. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!config || isLoading) {
      return;
    }

    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const conversation = updatedMessages
        .map(
          (message) =>
            `${message.role}: ${message.content}`
        )
        .join('\n');

      const response = await GET_CHAT(
        `You are an interview preparation assistant.

Interview topic: ${config.topic}
Experience level: ${config.experience}
Preparation time: ${config.duration} minutes.

Use the conversation below to understand what the user
is asking for.

The user may:
- Ask for answers to questions
- Ask for an explanation
- Ask for more interview questions
- Ask for practical or scenario-based questions
- Ask for feedback on an answer
- Ask to practice questions one by one

Respond according to the user's request.

Keep your response relevant to the interview topic
and experience level.

Conversation:
${conversation}`
      );

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response??"Not available",
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);
    } catch (error) {
      console.error(
        'Failed to get AI response:',
        error
      );

      setError(
        'Unable to get a response from AI. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeInterview = () => {
    setConfig(null);
    setMessages([]);
    setError(null);
    setIsLoading(false);
  };

  return {
    config,
    messages,
    isLoading,
    error,
    startInterview,
    sendMessage,
    closeInterview,
  };
};

export default useChat;