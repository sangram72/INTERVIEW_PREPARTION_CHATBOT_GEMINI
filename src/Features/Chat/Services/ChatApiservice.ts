import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY,
});

export const GET_CHAT = async (
  prompt: string
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
  });

  return response.text ?? '';
};