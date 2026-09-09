import { GoogleGenAI } from '@google/genai';

export const GET_CHAT = async (
  prompt: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key is missing');
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
  });

  return response.text ?? '';
};