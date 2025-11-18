
import { GoogleGenAI, Type } from '@google/genai';
import type { AIGenieSuggestion } from '../types';

export const getAIRecommendations = async (prompt: string): Promise<AIGenieSuggestion[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set in environment variables.");
    // Return mock data if API key is not available
    return [
      { title: "Inception", year: 2010 },
      { title: "The Matrix", year: 1999 },
      { title: "Blade Runner 2049", year: 2017 },
    ];
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the user's request, suggest three real movies that are likely to be found on The Movie Database (TMDB). Focus on well-known films. User request: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The full title of the movie.",
              },
              year: {
                type: Type.INTEGER,
                description: "The release year of the movie.",
              },
            },
            required: ["title", "year"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const suggestions = JSON.parse(jsonText);
    return suggestions as AIGenieSuggestion[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get AI recommendations.");
  }
};
