
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PlantInfo } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePlantImage = async (base64Image: string): Promise<PlantInfo> => {
  const ai = getAI();
  const prompt = `Identify this plant and provide detailed care information in JSON format. Be specific and helpful.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 4000 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          commonName: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          description: { type: Type.STRING },
          origin: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ['Easy', 'Moderate', 'Challenging'] },
          care: {
            type: Type.OBJECT,
            properties: {
              watering: { type: Type.STRING },
              sunlight: { type: Type.STRING },
              soil: { type: Type.STRING },
              fertilizer: { type: Type.STRING },
              toxicity: { type: Type.STRING }
            },
            required: ['watering', 'sunlight', 'soil', 'fertilizer', 'toxicity']
          }
        },
        required: ['commonName', 'scientificName', 'description', 'care', 'difficulty']
      }
    }
  });

  const data = JSON.parse(response.text || '{}');
  return { ...data, id: Date.now().toString(), image: `data:image/jpeg;base64,${base64Image}` };
};

export const startGardenChat = (systemInstruction: string) => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: systemInstruction,
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });
};
